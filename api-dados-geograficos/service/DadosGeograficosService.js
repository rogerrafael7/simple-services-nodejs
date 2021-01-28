const AbstractService = require('./AbstractService')
const UFModel = require('../model/uf')
const CidadeMunicipioModel = require('../model/cidadeMunicipio')

class DadosGeograficosService extends AbstractService {
  async removerCidadeMunicipio (id) {
    const doc = await CidadeMunicipioModel.findOne({ _id: id })
    if (doc) {
      await doc.delete()
    }
    return doc
  }
  async inserirCidadeMunicipio (cidadeMunicipio) {
    return new CidadeMunicipioModel(cidadeMunicipio).save()
  }
  async atualizarCidadeMunicipio (id, cidadeMunicipio = {}) {
    const doc = await CidadeMunicipioModel.findById(id)
    if (doc) {
      for (const key in cidadeMunicipio) {
        doc[key] = cidadeMunicipio[key]
      }
      await doc.save()
    }
    return doc
  }
  async getUfs () {
    return UFModel
      .find({})
      .sort({ nomeUf: 1 })
  }
  async getCidadesMunicipios ({ sortBy = { _id: 1 }, page = 1, size = 500, query = {} } = {}) {
    let skip = size * (page - 1)
    const count = await CidadeMunicipioModel
      .find(query)
      .count()

    return {
      rows: await CidadeMunicipioModel
        .find(query)
        .skip(+skip)
        .limit(+size)
        .sort(sortBy),
      count
    }
  }
}

module.exports = DadosGeograficosService
