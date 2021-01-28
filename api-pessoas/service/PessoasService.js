const AbstractService = require('./AbstractService')
const PessoaModel = require('../models/pessoasModel')

class PessoasService extends AbstractService {
  async removerPessoa(id) {
    const doc = await PessoaModel.findById(id)
    if (doc) {
      await doc.remove()
    }
    return doc
  }
  async atualizarPessoa(id, pessoa) {
    const doc = await PessoaModel.findById(id)
    if (doc) {
      for (const key in pessoa) {
        doc[key] = pessoa[key]
      }
      await doc.save()
    }
    return doc
  }
  async inserirPessoa(pessoa) {
    return new PessoaModel(pessoa).save()
  }
  async getPessoas ({ sortBy = { _id: 1 }, page = 1, size = 20, query = {} } = {}) {
    let skip = size * (page - 1)
    const count = await PessoaModel
      .find(query)
      .count()

    return {
      rows: await PessoaModel
        .find(query)
        .skip(+skip)
        .limit(+size)
        .sort(sortBy),
      count
    }
  }

  async getPessoa (id) {
    return PessoaModel.findById(id)
  }

  async savePessoa (pessoa) {
    let doc
    if (pessoa._id) {
      doc = await PessoaModel.findById(pessoa.id)
      if (doc) {
        for (const key in pessoa) {
          if (key !== '_id') {
            doc[key] = pessoa[key]
          }
        }
      }
    } else {
      doc = new PessoaModel(pessoa)
    }
    if (doc) {
      await doc.save()
    }
    return doc
  }
}

module.exports = PessoasService
