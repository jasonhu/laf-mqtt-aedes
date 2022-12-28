

import cloud from '@/cloud-sdk'

exports.main = async function (ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx

  const logger = cloud.shared.get('logger')

  console.log('socket size:', cloud.sockets.size)

  const aedes = cloud.shared.get('aedes')

  // console.log(aedes)

  console.log('id', aedes.id)
  console.log('clients', aedes.connectedClients)

  const logs = await logger.getLastLogs(50)

  logs.data.forEach(function (value, id) {
    console.log('log', id, new Date(value.created_at), value.level, value.msg)
  })
  // console.log('last 10 logs:', JSON.stringify(logs))
}
