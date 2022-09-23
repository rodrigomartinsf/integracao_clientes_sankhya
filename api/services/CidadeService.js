const axios = require('axios').default

class CidadeService {

  constructor(jsessionid) {
    this.jsessionid = jsessionid
    this.headers = {'Cookie': `JSESSIONID=${jsessionid}`}
    this.url = "http://navecunha.nuvemdatacom.com.br:9665/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json"
    this.codigoCidade = null
    this.codigoBairro = null
  }

  getHeaders(){
    return this.headers
  }
  
  getUrl(){
    return this.url
  }

  getBodyCidade(){
    return this.bodyCidade
  }

  getBodyBairro(){
    return this.bodyBairro
  }

  getCodigoCidade(){
    return this.codigoCidade
  }

  getCodigoBairro(){
    return this.codigoBairro
  }

  setCodigoCidade(newValue){
    this.codigoCidade = newValue
    this.setBodyCidade()
  }

  setCodigoBairro(newValue){
    this.codigoBairro = newValue
    this.setBodyBairro()
  }

  setBodyCidade() {
    this.bodyCidade = {"serviceName": "CRUDServiceProvider.loadRecords","requestBody": {"dataSet": {"rootEntity": "Cidade","includePresentationFields": "S","offsetPage": "0","criteria": {
                       "expression": {"$": "this.CODCID = " + this.getCodigoCidade()}},"entity": {"fieldset": {"list": "NOMECID,UF"}}}}}
  }

  setBodyBairro() {
    this.bodyBairro = {"serviceName": "CRUDServiceProvider.loadRecords","requestBody": {"dataSet": {"rootEntity": "Bairro","includePresentationFields": "N","offsetPage": "0","criteria": {
                       "expression": {"$": "this.CODBAI = " + this.getCodigoBairro() }},"entity": {"fieldset": {"list": "CODBAI,NOMEBAI"}}}}}
  }

  async searchCidadeByCodigo() {
    try {
      const res = await axios.post(this.getUrl(), this.getBodyCidade(), { headers: this.getHeaders() })
      let cidadeEstado = {'cidade': res.data.responseBody.entities.entity.f0.$, 'estado': res.data.responseBody.entities.entity.f3.$}
      return cidadeEstado
    } catch (error) {
      console.log('Erro de conexão com a API de cidades', error)
    }
  }

  async searchBairroByCodigo() {
    try {
      const res = await axios.post(this.getUrl(), this.getBodyBairro(), { headers: this.getHeaders() })
      return res.data.responseBody.entities.entity.f1.$
    } catch (error) {
      console.log('Erro de conexão com a API de bairros')
    }
  }
      
}

module.exports = CidadeService