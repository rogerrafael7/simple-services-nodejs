const httpProxy = require('express-http-proxy')
const { spawn } = require('child_process')

exports.init = (app) => {
  const _registryApi = (spawnHandler, name, dirPath, routePath, proxyUrl) => {
    spawnHandler.stdout.on('data', (data) => {
      console.log(`${name} -> stdout: ${data}`)

      const proxy = httpProxy(proxyUrl)
      app.use(routePath, (req, res, next) => {
        proxy(req, res, next)
      })
    })

    spawnHandler.stderr.on('data', (data) => {
      console.error(`${name} -> stderr: ${data}`)
    })

    spawnHandler.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })

    process.on('exit', () => {
      spawnHandler.kill(0)
    })
    process.on('disconnect', () => {
      spawnHandler.kill(0)
    })
  }

  /**
   * Registra um micro-service em NodeJs
   * @param name
   * @param dirPath
   * @param routePath
   * @param proxyUrl
   */
  const registryNodeApi = (name, dirPath, routePath, proxyUrl) => {
    // desta forma se torna possível criar outras funções q startam APIs em Java, Python, etc
    _registryApi(
      spawn('node', [dirPath], { cwd: __dirname }),
      name, dirPath, routePath, proxyUrl
    )
  }

  // Registro de APIs NodeJS
  registryNodeApi(
    'api-dados-geograficos',
    '../api-dados-geograficos/index.js',
    '/dados-geograficos',
    `http://localhost:${process.env.API_DADOS_GEOGRAFICOS_PORT}/dados-geograficos`
  )
  registryNodeApi(
    'api-pessoas',
    '../api-pessoas/index.js',
    '/pessoas',
    `http://localhost:${process.env.API_PESSOAS_PORT}/pessoas`
  )
}
