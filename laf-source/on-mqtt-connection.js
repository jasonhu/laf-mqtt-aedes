

import cloud from '@/cloud-sdk'

exports.main = async function (ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx

  if (ctx.method === "WebSocket:connection") {
    WebSocket_connection(ctx, ctx.socket)
  }
}

function WebSocket_connection(ctx, socket) {
  const aedes = cloud.shared.get('aedes')
  const WebSocket = require('ws')

  const stream = WebSocket.createWebSocketStream(socket)
  aedes.handle(stream, ctx)

}
