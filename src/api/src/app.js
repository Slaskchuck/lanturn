import express from 'express'
import cors from 'cors'
import { ValidationError } from 'express-validation'
import apiRoutes from './routes/api'
import db from './models/index'

global.Promise = require('bluebird')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

global.db = db

app.use("/api", apiRoutes)

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

module.exports = app
