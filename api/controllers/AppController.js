const ClienteController = require('./ClienteController')
const AuthController = require('./AuthController')

class AppController {

  constructor() {
    this.jsessionId = null
    this.clienteController = null
    this.authController = new AuthController()
    this.start()
  }
  
  async start() {
    this.jsessionId = await this.authController.logon()
    this.clienteController = new ClienteController(this.jsessionId)
    await this.clienteController.sendClientesToDatabase()
    await this.authController.logout()
  }
}

module.exports = AppController