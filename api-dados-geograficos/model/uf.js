const connection = require('./index')

const UF = connection.model('UF', {
  nomeUf: String,
  codigoIbge: Number,
  sigla: String
})

module.exports = UF
