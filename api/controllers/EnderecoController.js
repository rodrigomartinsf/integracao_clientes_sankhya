const EnderecoService = require('../services/EnderecoService')

class EnderecoController {

  constructor(jsessionId) {
    this.jsessionId = jsessionId
    this.enderecoId = null
    this.enderecoService = new EnderecoService(this.jsessionId)
  }

  getEnderecoId() {
    return this.enderecoId
  }

  setEnderecoId(newValue) {
    this.enderecoId = newValue
  }

  async getEnderecoById() {
    this.enderecoService.setCodigoEndereco(this.getEnderecoId())
    let enderecoDescricao = await this.enderecoService.searchEnderecoByCodigo()
    return enderecoDescricao
  }
}

module.exports = EnderecoController