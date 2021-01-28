require('./globals/CustomException')

const express = require('express')
const bodyParser = require('body-parser')
const responser = require('./middleware/responser')
const factoryControllers = require('./factory-controllers')

module.exports = async (name, controllersDirectoryPath, PORT, middlewares = []) => {
  const server = express()

  server.use(bodyParser.json())
  server.use(responser)

  for (const middleware of middlewares) {
    server.use(middleware)
  }

  await factoryControllers.init(controllersDirectoryPath, server)

  server.listen(PORT, () => {
    console.log(`API: ${name} - rodando na porta: ${PORT}`)
  })
  return server
}
