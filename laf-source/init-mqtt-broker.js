

import cloud from '@/cloud-sdk'

import * as Aedes from 'aedes'

exports.main = async function (ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  // const { auth, body, query } = ctx

  // // 数据库操作
  // const db = cloud.database()
  // const r = await db.collection('admins').get()
  // console.log(r)

  // return r.data
  cloud.shared.set('logger', new SysLogger())

  const logger = cloud.shared.get('logger')

  const options = {
    id: 'my-broker',
    heartbeatInterval: 10000
  }
  const aedes = new Aedes({ ...options })
  aedes.on('clientReady', onClientReady)
  aedes.on('publish', onPublish)
  aedes.on('subscribe', onSub)
  aedes.on('unsubscribe', onUnSub)
  aedes.authenticate = onAuthenticate
  cloud.shared.set('aedes', aedes)

  logger.info('init aedes finished')

  console.log(aedes)


}

function onClientReady(client) {
  const logger = cloud.shared.get('logger')
  logger.info(client.id, 'is ready')
}

function onPublish(p, client) {
  const logger = cloud.shared.get('logger')
  logger.info('onPublish client', client)
  logger.info('onPublish package', p)
}

function onSub(subs, client) {
  const logger = cloud.shared.get('logger')
  logger.info(client.id, 'subscribe', subs)
}

function onUnSub(unsubs, client) {
  const logger = cloud.shared.get('logger')
  logger.info(client.id, 'unsubscribe', unsubs)
}

function onAuthenticate(client, username, password, callback) {
  const logger = cloud.shared.get('logger')
  logger.info(client.id, 'auth username', username)
  callback(null, true)
}

class SysLogger {
  constructor() {

  }

  log(...param) {
    this.saveLogDetail('', '', 'log', ...param)
  }

  info(...param) {
    this.saveLogDetail('', '', 'info', ...param)
  }

  error(...param) {
    this.saveLogDetail('', '', 'error', ...param)
  }

  saveLogDetail(cate, bindid, level, ...param) {
    const db = cloud.database()
    const log = {
      cate,
      bindid,
      level,
      msg: param,
      created_at: Date.now()
    }
    db.collection('system-logger').add(log)
  }

  /**
   * 时间顺序倒排的最后limit条日志
   */
  getLastLogs(limit) {
    const db = cloud.database()
    return db.collection('system-logger')
      .orderBy("created_at", "desc")
      .limit(limit)
      .get()
  }
