const TipoNegociacaoService = require('../services/TipoNegociacaoService')

class TipoNegociacaoController {

  constructor(jsessionId) {
    this.jsessionId = jsessionId
    this.codigoParceiro = null
    this.tipoNegociacaoService = new TipoNegociacaoService(this.jsessionId)
  }

  getCodigoParceiro() {
    return this.codigoParceiro
  }

  setCodigoParceiro(newValue) {
    this.codigoParceiro = newValue
  }

  async getTipoNegociacao() {
    this.tipoNegociacaoService.setCodigoParceiro(this.getCodigoParceiro())
    const tipoNegociacaoDescricao = await this.tipoNegociacaoService.searchTipoNegociacaoByCodigoParceiro()
    return tipoNegociacaoDescricao
  }

}

module.exports = TipoNegociacaoController