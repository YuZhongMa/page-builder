const queryString = require('query-string')

const WebSocketAPI = (wss, wsMap) => {
  wss.on('connection', function connection(ws, req) {
    const packageId = queryString.parseUrl(req.url).query.packageId
    wsMap[packageId] = ws
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    })
    ws.on('close', () => {
      console.log(`关闭--${packageId}`)
      delete wsMap[packageId]
    })
    ws.send(JSON.stringify({
      status: 'init',
      text: '成功与服务端建立连接...'
    }))
  })
}

module.exports = WebSocketAPI