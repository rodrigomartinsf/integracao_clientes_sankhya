const ClienteService = require('../services/ClienteService')
const ClienteSchema = require('../schemas/ClienteSchema')
const CidadeController = require('./CidadeController')
const EnderecoController = require('./EnderecoController')
const TipoNegociacaoController = require('./TipoNegociacaoController')

const db = require('../models')

class ClienteController {

  constructor(jsessionId) {
    this.jsessionId = jsessionId
    this.clienteService = new ClienteService(jsessionId)
    this.cidadeController = new CidadeController(jsessionId)
    this.enderecoController = new EnderecoController(jsessionId)
    this.tipoNegociacaoController = new TipoNegociacaoController(jsessionId)
  }

  async pegaListaDeClientes() {
    const listaClientes = await this.clienteService.getAll()
    return listaClientes
  }

  async sendClientesToDatabase() {
    try {
      const listaClientes = await this.pegaListaDeClientes()
      //Verifica se o cliente já esta no banco de dados
      for (let i = 0; i < listaClientes.length; i++) {
        let clienteSchema = new ClienteSchema(listaClientes[i].codigo_parceiro, listaClientes[i].razao_social, listaClientes[i].nome_parceiro, listaClientes[i].tipo_pessoa, 
                                              listaClientes[i].cgc_cpf, listaClientes[i].inscricao_estadual, listaClientes[i].data_nascimento, listaClientes[i].rotaId, 
                                              listaClientes[i].prazo, listaClientes[i].cep, listaClientes[i].complemento, listaClientes[i].bairro, listaClientes[i].cidade, 
                                              listaClientes[i].tabela_preco, listaClientes[i].bloquear, listaClientes[i].ativo, listaClientes[i].endereco, listaClientes[i].numero, 
                                              listaClientes[i].latitude, listaClientes[i].longitude)

        const clienteModel = await db.clientes.findOne({ where: { codigo_parceiro: clienteSchema.getCodigoParceiro() } })

        //Busca a cidade, bairro, endereço, tabela de preço e tipo de negociação de cada cliente e altera no schema
        clienteSchema = await this.setDados(clienteSchema)
        
        //Verifica se o cliente foi encontado no banco de dados. 
        //Caso já tenha o cliente cadastrado faz o Update
        if(clienteModel){
          await db.clientes.update(clienteSchema, {
            where: {
              codigo_parceiro: clienteSchema.getCodigoParceiro()
            }
          })
          console.log(listaClientes[i].nome_parceiro)
        }
        //Caso contrário, Cadastra o cliente
        else{
          await db.clientes.create(clienteSchema)
          console.log('Novo cliente Cadastrado', clienteSchema.getNomeParceiro())
        }
      }
    } catch (error) {
        console.log('Erro ao recuperar os clientes da API do Sankhya')
        console.log(error)
    }
  }

  async setDados(clienteSchema) {
    //Busca a cidade e bairro de cada cliente
    let cidadeId = clienteSchema.getCidade()
    let bairroId = clienteSchema.getBairro()
    this.cidadeController.setCidadeSankhyaId(cidadeId)
    this.cidadeController.setBairroSankhyaId(bairroId)
    let cidadeEstado = await this.cidadeController.getCidadeDescSankhya()
    let bairroDescricao = await this.cidadeController.getBairroDescSankhya()
    clienteSchema.setCidade(cidadeEstado.cidade)
    clienteSchema.setEstado(cidadeEstado.estado)
    clienteSchema.setBairro(bairroDescricao)

    //Busca o endereço de cada cliente
    let enderecoId = clienteSchema.getEndereco()
    this.enderecoController.setEnderecoId(enderecoId)
    let enderecoDescricao = await this.enderecoController.getEnderecoById()
    clienteSchema.setEndereco(enderecoDescricao)
    
    //Busca o tipo de negociação de cada cliente
    this.tipoNegociacaoController.setCodigoParceiro(clienteSchema.getCodigoParceiro())
    const tipoNegociacaoDescricao = await this.tipoNegociacaoController.getTipoNegociacao()
    clienteSchema.setPrazo(tipoNegociacaoDescricao)
    return clienteSchema
  }
}

module.exports = ClienteController