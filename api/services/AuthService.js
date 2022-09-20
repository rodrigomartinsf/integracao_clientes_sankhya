const axios = require('axios').default

class AuthService {

  constructor() {
    this.user =  process.env.SANKHYA_USER
    this.password =  process.env.SANKHYA_PASSWORD
    this.urlLogin = process.env.SANKHYA_URL_LOGIN
    this.bodyLogin = { "serviceName": "MobileLoginSP.login", "requestBody": { "NOMUSU": { "$": ""+ this.user +"" }, "INTERNO":{ "$":""+ this.password +"" }, "KEEPCONNECTED": { "$": "S" } } }
    this.sessionId = null
    this.urlLogout = process.env.SANKHYA_URL_LOGOUT
    this.bodyLogout = {"serviceName":"MobileLoginSP.logout","status":"1","pendingPrinting":"false"}
  }

  getSessionId() {
    return this.sessionId
  }

  setSessionId(newValue) {
    this.sessionId = newValue 
  }

  logon = async () => {
    try {
      const res = await axios.post(this.urlLogin, this.bodyLogin, { withCredentials: true })
      const jsessionid = res.data.responseBody.jsessionid.$
      this.setSessionId(jsessionid)
      //console.log('Logado!', res.data)
    return jsessionid
    } catch (error) {
      console.log('Erro de conexão com a API!')
    }
    
  }

  async logout(){
    const jsession = 'JSESSIONID='+ this.getSessionId()
    const headers = {'Cookie': jsession}
    try {
      await axios.post(this.urlLogout, this.bodyLogout, { headers: headers })
      console.log('logout')
    } catch (error) {
      console.log('Erro de conexão com a API!')
    }
  }

}

module.exports = new AuthService()