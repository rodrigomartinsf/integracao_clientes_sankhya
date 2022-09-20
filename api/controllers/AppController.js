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
    this.insert()
  }

  async insert() {
    this.sendClientesToDatabase()
  }

  async sendClientesToDatabase() {
    await this.clienteController.sendClientes()
    await AuthService.logout()
  }
}

module.exports = AppController