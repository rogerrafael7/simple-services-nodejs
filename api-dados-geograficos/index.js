const fs = require('fs')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.development')
})

const baseApi = require('base-api')

const CONTROLLERS_PATH = path.resolve(__dirname, './controllers')
const PORT = process.env.API_DADOS_GEOGRAFICOS_PORT

;(async () => {
  await baseApi('Dados Geográficos', CONTROLLERS_PATH, PORT)
  await controlSeeds()
})()

const controlSeeds = async () => {
  const connection = require('./model/index')
  const SeedModel = connection.model('seeds', {
    created_at: {
      type: Date,
      default: () => new Date()
    },
    seedFileName: {
      type: String,
      required: true
    }
  })

  const seedsSaved = (await SeedModel.find({}, { _id: 1, seedFileName: 1 }))
    .map(({ seedFileName }) => seedFileName)
  const pathSeeds = path.resolve(__dirname, 'seeds')
  const seedsFs = fs.readdirSync(pathSeeds)

  for (const seedFileName of seedsFs) {
    if (!seedsSaved.includes(seedFileName)) {
      const pathFile = path.resolve(pathSeeds, seedFileName)
      await require(pathFile)()
      await new SeedModel({
        seedFileName
      }).save()
    }
  }
}
