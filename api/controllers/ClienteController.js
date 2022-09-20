const db = require('../models')

class ClienteController {

  constructor(jsessionId) {
    this.jsessionId = jsessionId
  }
}

module.exports = ClienteController