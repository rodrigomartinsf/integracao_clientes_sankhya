const axios = require('axios').default

class EnderecoController {

  constructor(jsessionid, codigoEndereco) {
    this.jsessionid = jsessionid
    this.headers = {'Cookie': `JSESSIONID=${jsessionid}`}
    this.url = "http://navecunha.nuvemdatacom.com.br:9665/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json"
    this.codigoEndereco = codigoEndereco
    this.body = {"serviceName": "CRUDServiceProvider.loadRecords","requestBody": {"dataSet": {"rootEntity": "Endereco","includePresentationFields": "S","offsetPage": "0","criteria": {
                  "expression": {"$": "this.CODEND = " + codigoEndereco }},"entity": {"fieldset": {"list": "CODEND,NOMEEND,TIPO,CODLOGRADOURO"}}}}}
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

  async searchEnderecoByCodigo() {
    const res = await axios.post(this.getUrl(), this.getBody(), { headers: this.getHeaders() })
    const endereco = `${res.data.responseBody.entities.entity.f2.$} ${res.data.responseBody.entities.entity.f1.$}`
    return endereco
  }

}

module.exports = EnderecoController