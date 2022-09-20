const AuthService = require('../services/AuthService')
const ClienteController = require('./ClienteController')

class AppController {

  constructor() {
    this.start()
    this.jsessionId = null
    this.clienteController = null
  }

  async start() {
    this.jsessionId = await AuthService.logon()
    this.clienteController = new ClienteController(this.jsessionId)
    await this.clienteController.sendClientesToDatabase()
    await AuthService.logout()
  }
}

module.exports = AppController