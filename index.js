const http        = require('http')
const app         = require('./app')()
const server      = http.createServer(app)
const port        = parseInt(process.env.PORT || 3000)

server.listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port));
