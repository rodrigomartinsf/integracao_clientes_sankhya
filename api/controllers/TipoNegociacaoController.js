const TipoNegociacaoService = require('../services/TipoNegociacaoService')
const db = require('../models')

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

  async getTipoNegociacaoIdVendasExternas(id) {
    const tipoNegociacao = await db.tipo_negociacao.findOne({ where: { id_forma_pagamento_sankhya: id } })
    return tipoNegociacao
  }

}

module.exports = TipoNegociacaoController