const ClienteService = require('../services/ClienteService')
const db = require('../models')

class ClienteController {

  constructor(jsessionId) {
    this.jsessionId = jsessionId
  }
}

module.exports = ClienteController