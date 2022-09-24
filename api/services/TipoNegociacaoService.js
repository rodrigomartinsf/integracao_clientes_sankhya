const axios = require('axios').default

class TipoNegociacaoService {

  constructor(jsessionid, codigoParceiro) {
    this.jsessionid = jsessionid
    this.headers = {'Cookie': `JSESSIONID=${jsessionid}`}
    this.url = "http://navecunha.nuvemdatacom.com.br:9665/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json"
    this.codigoParceiro = codigoParceiro
    this.body = null
  }

  getCodigoParceiro() {
    return this.codigoParceiro
  }

  getHeaders() {
    return this.headers
  }

  getUrl() {
    return this.url
  }

  getBody() {
    return this.body
  }

  setCodigoParceiro(newValue) {
    this.codigoParceiro = newValue
    this.setBody()
  }

  setBody() {
    this.body = {"serviceName": "CRUDServiceProvider.loadRecords","requestBody": {"dataSet": {"rootEntity": "ComplementoParc","includePresentationFields": "N","offsetPage": "0","criteria": {
                  "expression": {"$": "this.CODPARC = " + this.getCodigoParceiro()}},"entity": {"fieldset": {"list": "SUGTIPNEGSAID"}}}}}
  }

  async searchTipoNegociacaoByCodigoParceiro() {
    const res = await axios.post(this.getUrl(), this.getBody(), { headers: this.getHeaders() })
    let tipoNegociacao = res.data.responseBody.entities.entity.f0.$
    tipoNegociacao == 0 ? tipoNegociacao = 11 : tipoNegociacao = tipoNegociacao
    return tipoNegociacao
  }

}

module.exports = TipoNegociacaoService