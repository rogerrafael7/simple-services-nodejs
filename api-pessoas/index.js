const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.development')
})

const baseApi = require('base-api')

const CONTROLLERS_PATH = path.resolve(__dirname, './controllers')
const PORT = process.env.API_PESSOAS_PORT

;(async () => {
  await baseApi('Pessoas', CONTROLLERS_PATH, PORT)
})()
