const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.development')
})

const http = require('http')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.MAIN_SERVER_PORT

const app = express()
const server = http.createServer(app)

app.use(cors())
// aqui poderia ser registrado outros middlewares, por exemplo, controle de autorização e autenticação
routes.init(app)

server.listen(PORT, () => {
  process.title = 'Server Teste Apis'
  console.log(`Servidor Principal rodando na porta: ${PORT}`)
});
