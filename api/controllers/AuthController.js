const AuthService = require('../services/AuthService')

class AuthController {

  constructor() {
    this.authService = new AuthService()
    this.jsessionId = null
  }

  getJsessionId() {
    return this.jsessionId
  }

  setJsessionId(newValue) {
    this.jsessionId = newValue
  }

  async logon() {
    const jsession = await this.authService.logon()
    this.setJsessionId(jsession)
    return jsession
  }

  async logout() {
    this.authService.setSessionId(this.getJsessionId())
    await this.authService.logout()
  }
}

module.exports = AuthController
