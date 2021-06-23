import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

const routes = fs.readdirSync(__dirname)

routes.map(route => {
  if (route === 'api.js')
    return

  const apiRoutes = require(path.resolve(__dirname, route))

  Object.keys(apiRoutes).map(method => {
    apiRoutes[method].map(endpoint => {
      router[method](`/${path.basename(route, '.js')}${endpoint.path}`, endpoint.validator, endpoint.controller)
    })
  })
})

module.exports = router
