const express     = require('express')
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const cors        = require('cors')

module.exports = function getAppInstance(logging = true) {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cors({origin: true}))
  if (logging) app.use(morgan('dev'))

  app.get('/', (req, res) => { res.send({message: 'HAL 9000 says welcome!'}) })
  // ADD (MOUNT) YOUR MIDDLEWARE (ROUTES) HERE
  app.use('/books', require('./routes/books'))

  app.use(notFound)
  app.use(errorHandler)

  return app
}

function notFound(req, res, next) {
  res.status(404)
    .send({error: 'Url not found', status: 404, url: req.url})
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  res.status(500)
    .send({error: err, url: req.url, status: 500})
}