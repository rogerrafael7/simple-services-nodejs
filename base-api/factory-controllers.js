const fs = require('fs')
const path = require('path')
const express = require('express')
const { Router } = express

// registra dinamicamente todos as rotas de todos os Controllers
const controllersModule = {
  init: async (controllersDirectoryPath, appServer) => {
    const controllersFiles = fs.readdirSync(controllersDirectoryPath)
      .filter((filename) =>
        !filename.match(/^Abstract/i) &&
        filename.match(/Controller.js$/i)
      )

    for (const filename of controllersFiles) {
      const pathController = path.resolve(controllersDirectoryPath, filename)
      const controllerConfig = require(pathController)
      const router = Router()
      for (const routeConfig of controllerConfig.routes) {
        router[routeConfig.method](routeConfig.path, async (req, res) => {
          try {
            const result = await routeConfig.handler(req, res)
            res.success(result)
          } catch (error) {
            res.error(error)
          }
        })
      }
      appServer.use(controllerConfig.basepath, router)
    }
  }
}

module.exports = controllersModule
