
class ClienteController{

  constructor(codigoParceiro, razao_social, nome_parceiro, tipo_pessoa, cgc_cpf, inscricao_estadual, data_nascimento, rotaId, prazo, cep, complemento, 
              bairro, cidade, tabela_preco, bloquear, ativo, endereco, numero, latitude, longitude) {
    this.codigo_parceiro =  codigoParceiro
    this.razao_social = razao_social
    this.nome_parceiro = nome_parceiro
    this.tipo_pessoa = tipo_pessoa
    this.cgc_cpf = cgc_cpf
    this.inscricao_estadual = inscricao_estadual
    this.data_nascimento = data_nascimento
    this.rotaId = rotaId
    this.rotaIdVendasExternas = null
    this.prazo = prazo
    this.formaPagamentoIdVendasExternas = null
    this.condicaoPagamentoIdVendasExternas = null
    this.cep = cep
    this.complemento = complemento
    this.bairro = bairro
    this.cidade = cidade
    this.estado = null
    this.tabela_preco = tabela_preco
    this.tabelaPrecoVendasExternas = null
    this.bloquear = bloquear
    this.ativo = ativo
    this.endereco = endereco
    this.numero = numero
    this.latitude = latitude
    this.longitude = longitude
  }

  //GET
  getCodigoParceiro() {
    return this.codigo_parceiro
  }
  
  getRazaoSocial() {
    return this.razao_social
  }

  getNomeParceiro() {
    return this.razao_social
  }

  getTipoPessoa() {
    return this.tipo_pessoa
  }

  getCgcCpf() {
    return this.cgc_cpf
  }

  getInscricaoEstadual() {
    return this.inscricao_estadual
  }

  getDataNascimento() {
    return this.data_nascimento
  }

  getRotaId() {
    return this.rotaId
  }

  getRotaIdVendasExternas() {
    return this.rotaIdVendasExternas
  }

  getPrazo() {
    return this.prazo
  }

  getFormaPagamentoIdVendasExternas() {
    return this.formaPagamentoIdVendasExternas
  }

  getCondicaoPagamentoIdVendasExternas() {
    return this.condicaoPagamentoIdVendasExternas
  }

  getCep() {
    return this.cep
  }

  getComplemento() {
    return this.complemento
  }

  getBairro() {
    return this.bairro
  }

  getCidade() {
    return this.cidade
  }

  getEstado() {
    return this.estado
  }

  getTabelaPreco() {
    return this.tabela_preco
  }

  getTabelaPrecoVendasExternas() {
    return this.tabelaPrecoVendasExternas
  }

  getBloquear() {
    return this.bloquear
  }

  getAtivo() {
    return this.ativo
  }

  getEndereco() {
    return this.endereco
  }

  getNumero() {
    return this.numero
  }

  getLatitude() {
    return this.latitude
  }

  getLongitude() {
    return this.longitude
  }

//SET

setCodigoParceiro(newValue) {
  this.codigo_parceiro = newValue
}

setRazaoSocial(newValue) {
  this.razao_social = newValue
}

setNomeParceiro(newValue) {
  this.nome_parceiro = newValue
}

setTipoPessoa(newValue) {
  this.tipo_pessoa = newValue
}

setCgcCpf(newValue) {
  this.cgc_cpf = newValue
}

setInscricaoEstadual(newValue) {
  this.inscricao_estadual = newValue
}

setDataNascimento(newValue) {
  this.data_nascimento = newValue
}

setRotaId(newValue) {
  this.rotaId = newValue
}

setRotaIdVendasExternas(newValue) {
  this.rotaIdVendasExternas = newValue
}

setPrazo(newValue) {
  this.prazo = newValue
}

setFormaPagamentoIdVendasExternas(newValue) {
  this.formaPagamentoIdVendasExternas = newValue
}

setCondicaoPagamentoIdVendasExternas(newValue) {
  this.condicaoPagamentoIdVendasExternas = newValue
}

setCep(newValue) {
  this.cep = newValue
}

setComplemento(newValue) {
  this.complemento = newValue
}

setBairro(newValue) {
  this.bairro = newValue
}

setCidade(newValue) {
  this.cidade = newValue
}

setEstado(newValue) {
  this.estado = newValue
}

setTabelaPreco(newValue) {
  this.tabela_preco = newValue
}

setTabelaPrecoVendasExternas(newValue) {
  this.tabelaPrecoVendasExternas = newValue
}

setBloquear(newValue) {
  this.bloquear = newValue
}

setAtivo(newValue) {
  this.ativo = newValue
}

setEndereco(newValue) {
  this.endereco = newValue
}

setNumero(newValue) {
  this.numero = newValue
}

setLatitude(newValue) {
  this.latitude = newValue
}

setLongitude(newValue) {
  this.longitude = newValue
}

}

module.exports = ClienteController