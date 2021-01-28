const PessoasService = require('../service/PessoasService')

module.exports = {
  basepath: '/',
  routes: [
    {
      path: '/',
      method: 'get',
      handler: async (req, res) => {
        return new PessoasService(req, res).getPessoas({
          ...req.query,
          query: typeof req.query.query === 'string' ? JSON.parse(req.query.query) : req.query.query
        })
      }
    },
    {
      path: '/',
      method: 'post',
      handler: async (req, res) => {
        return new PessoasService(req, res).inserirPessoa(req.body)
      }
    },
    {
      path: '/:id',
      method: 'put',
      handler: async (req, res) => {
        return new PessoasService(req, res).atualizarPessoa(req.params.id, req.body)
      }
    },
    {
      path: '/:id',
      method: 'delete',
      handler: async (req, res) => {
        return new PessoasService(req, res).removerPessoa(req.params.id)
      }
    },
    {
      path: '/:id',
      method: 'get',
      handler: async (req, res) => {
        return new PessoasService(req, res).getPessoa(req.params.id)
      }
    }
  ]
}
