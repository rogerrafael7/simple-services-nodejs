const DadosGeograficosService = require('../service/DadosGeograficosService')

module.exports = {
  basepath: '/',
  routes: [
    {
      path: '/uf',
      method: 'get',
      handler: async (req, res) => {
        return new DadosGeograficosService(req, res).getUfs()
      }
    },
    {
      path: '/uf/:uf/municipios',
      method: 'get',
      handler: async (req, res) => {
        return new DadosGeograficosService(req, res).getCidadesMunicipios({
          query: {
            siglaUf: req.params.uf
          }
        })
      }
    },
    {
      path: '/municipios',
      method: 'get',
      handler: async (req, res) => {
        return new DadosGeograficosService(req, res).getCidadesMunicipios({
          ...req.query,
          query: typeof req.query.query === 'string' ? JSON.parse(req.query.query) : req.query.query
        })
      }
    },
    {
      path: '/municipios',
      method: 'post',
      handler: async (req, res) => {
        return new DadosGeograficosService(req, res).inserirCidadeMunicipio(req.body)
      }
    },
    {
      path: '/municipios/:id',
      method: 'put',
      handler: async (req, res) => {
        return new DadosGeograficosService(req, res).atualizarCidadeMunicipio(req.params.id, req.body)
      }
    },
    {
      path: '/municipios/:id',
      method: 'delete',
      handler: async (req, res) => {
        return new DadosGeograficosService(req, res).removerCidadeMunicipio(req.params.id)
      }
    }
  ]
}
