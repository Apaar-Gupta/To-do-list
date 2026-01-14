const express = require('express')
const { testController } = require('../controllers/testController.js')

const Router = express.Router()

Router.get('/',testController)

module.exports = Router