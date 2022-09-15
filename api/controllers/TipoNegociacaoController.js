const axios = require('axios').default

class TipoNegociacaoController {

  constructor(jsessionid, codigoParceiro) {
    this.jsessionid = jsessionid
    this.headers = {'Cookie': `JSESSIONID=${jsessionid}`}
    this.url = "http://navecunha.nuvemdatacom.com.br:9665/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json"
    this.codigoParceiro = codigoParceiro
    this.body = {"serviceName": "CRUDServiceProvider.loadRecords","requestBody": {"dataSet": {"rootEntity": "ComplementoParc","includePresentationFields": "N","offsetPage": "0","criteria": {
                  "expression": {"$": "this.CODPARC = " + codigoParceiro}},"entity": {"fieldset": {"list": "SUGTIPNEGSAID"}}}}}
  }

  getHeaders() {
    return this.headers
  }

  getUrl() {
    return this.url
  }

  getCodigoEndereco() {
    return this.codigoEndereco
  }

  getBody() {
    return this.body
  }

  async searchTipoNegociacaoByCodigoParceiro() {
    const res = await axios.post(this.getUrl(), this.getBody(), { headers: this.getHeaders() })
    const tipoNegociacao = res.data.responseBody.entities.entity.f0.$
    return tipoNegociacao
  }

}

module.exports = TipoNegociacaoController