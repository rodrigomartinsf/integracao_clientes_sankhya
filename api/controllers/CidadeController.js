const CidadeService = require('../services/CidadeService')

class CidadeController {

  constructor(jsessionId) {
    this.jsessionId = jsessionId
    this.cidadeSankhyaId = null
    this.bairroSankhaId = null
    this.cidadeService = new CidadeService(this.jsessionId)

  }

  getCidadeSankhyaId() {
    return this.cidadeSankhyaId;
   }

   getBairroSankhaId() {
    return this.bairroSankhaId;
  }

  setCidadeSankhyaId(newValue) {
   this.cidadeSankhyaId =  newValue
  }

  setBairroSankhyaId(newValue) {
    this.bairroSankhaId = newValue
  }

  async getCidadeDescSankhya() {
    this.cidadeService.setCodigoCidade(this.getCidadeSankhyaId())
    let cidadeEstado = await this.cidadeService.searchCidadeByCodigo()
    return cidadeEstado
  }

  async getBairroDescSankhya() {
    this.cidadeService.setCodigoBairro(this.getBairroSankhaId())
    let bairroDescricao = await this.cidadeService.searchBairroByCodigo()
    return bairroDescricao
  }
}

module.exports = CidadeController