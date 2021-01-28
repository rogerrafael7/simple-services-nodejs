const connection = require('./index')
const { Schema } = require('mongoose')
const axios = require('axios')

const schema = new Schema({
  nomeMunicipio: String,
  siglaUf: String,
  codigoIbge: Number
})
schema.pre('remove', function (next) {
  try {
    const MAIN_PORT = process.env.MAIN_SERVER_PORT
    axios.get(`http://localhost:${MAIN_PORT}/pessoas`, {
      params: {
        query: {
          uf: this.siglaUf,
          cidade: this.nomeMunicipio
        }
      }
    })
      .then(({ data: { count } }) => {
        try {
          if (count) {
            throw new CustomException('Existem pessoas vinculadas a esta cidade!')
          }
          next()
        } catch (error) {
          next(error)
        }
      })
      .catch(next)

  } catch (error) {
    next(error)
  }
})

const CidadeMunicipioModel = connection.model('CidadeMunicipio', schema)

module.exports = CidadeMunicipioModel
