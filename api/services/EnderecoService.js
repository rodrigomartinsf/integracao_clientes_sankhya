const axios = require('axios').default

class EnderecoService {

  constructor(jsessionid, codigoEndereco) {
    this.jsessionid = jsessionid
    this.headers = {'Cookie': `JSESSIONID=${jsessionid}`}
    this.url = "http://navecunha.nuvemdatacom.com.br:9665/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json"
    this.codigoEndereco = codigoEndereco
    this.body = null
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

  setCodigoEndereco(newValue) {
    this.codigoEndereco = newValue
    this.setBody()
  }

  setBody() {
    this.body = this.body = {"serviceName": "CRUDServiceProvider.loadRecords","requestBody": {"dataSet": {"rootEntity": "Endereco","includePresentationFields": "S","offsetPage": "0","criteria": {
                             "expression": {"$": "this.CODEND = " + this.getCodigoEndereco() }},"entity": {"fieldset": {"list": "CODEND,NOMEEND,TIPO,CODLOGRADOURO"}}}}}
  }

  async searchEnderecoByCodigo() {
    const res = await axios.post(this.getUrl(), this.getBody(), { headers: this.getHeaders() })
    const endereco = `${res.data.responseBody.entities.entity.f2.$} ${res.data.responseBody.entities.entity.f1.$}`
    return endereco
  }

}

module.exports = EnderecoService