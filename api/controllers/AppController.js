const AuthService = require('../services/AuthService')
const ClienteService = require('../services/ClienteService')
const CidadeService = require('../services/CidadeService')
const EnderecoService = require('../services/EnderecoService')
const TipoNegociacaoService = require('../services/TipoNegociacaoService')
const ClienteSchema = require('../schemas/ClienteSchema')
const ClienteController = require('./ClienteController')
const db = require('../models')


class AppController {

  constructor() {
    this.start()
    this.jsessionId = null
    this.clienteService = null
    this.clienteController = null
  }

  async start() {
    this.jsessionId = await AuthService.logon()
    this.clienteController = new ClienteController(this.jsessionId)
    this.clienteService = new ClienteService(this.jsessionId)
    this.insert()
  }

  async insert() {
    this.sendClientesToDatabase()
  }

  async sendClientesToDatabase() {
    try {
      const listaClientes = await this.clienteService.getAll()
      //Verifica se o cliente já esta no banco de dados
      for (let i = 0; i < listaClientes.length; i++) {
        const novoCliente = new ClienteSchema(listaClientes[i].codigo_parceiro, listaClientes[i].razao_social, listaClientes[i].nome_parceiro, listaClientes[i].tipo_pessoa, 
                                              listaClientes[i].cgc_cpf, listaClientes[i].inscricao_estadual, listaClientes[i].data_nascimento, listaClientes[i].rotaId, 
                                              listaClientes[i].prazo, listaClientes[i].cep, listaClientes[i].complemento, listaClientes[i].bairro, listaClientes[i].cidade, 
                                              listaClientes[i].tabela_preco, listaClientes[i].bloquear, listaClientes[i].ativo, listaClientes[i].endereco, listaClientes[i].numero, 
                                              listaClientes[i].latitude, listaClientes[i].longitude)
        const clienteModel = await db.clientes.findOne({
          where: {
            codigo_parceiro: novoCliente.getCodigoParceiro()
          }
        })

        //Busca a cidade e bairro de cada cliente
        let cidadeId = novoCliente.getCidade()
        let bairroId = novoCliente.getBairro()
        const cidadeService = new CidadeService(this.jsessionId, cidadeId, bairroId)
        let cidadeEstado = await cidadeService.searchCidadeByCodigo()
        let bairroDescricao = await cidadeService.searchBairroByCodigo()
        novoCliente.setCidade(cidadeEstado.cidade)
        novoCliente.setEstado(cidadeEstado.estado)
        novoCliente.setBairro(bairroDescricao)

        //Busca o endereço de cada cliente
        let enderecoId = novoCliente.getEndereco()
        const enderecoService = new EnderecoService(this.jsessionId, enderecoId)
        let enderecoDescricao = await enderecoService.searchEnderecoByCodigo()
        novoCliente.setEndereco(enderecoDescricao)
        
        //Busca o tipo de negociação de cada cliente
        const tipoNegociacaoService = new TipoNegociacaoService(this.jsessionId, novoCliente.getCodigoParceiro())
        const tipoNegociacaoDescricao = await tipoNegociacaoService.searchTipoNegociacaoByCodigoParceiro()
        novoCliente.setPrazo(tipoNegociacaoDescricao)
        
        //Verifica se o cliente foi encontado no banco de dados. 
        //Caso já tenha o cliente cadastrado faz o Update
        if(clienteModel){
          await db.clientes.update(novoCliente, {
            where: {
              codigo_parceiro: novoCliente.getCodigoParceiro()
            }
          })
          console.log(listaClientes[i].nome_parceiro)
        }
        //Caso contrário, Cadastra o cliente
        else{
          await db.clientes.create(novoCliente)
          console.log('Novo cliente Cadastrado', novoCliente.getNomeParceiro())
        }
      }
    } catch (error) {
        console.log('Erro ao recuperar os clientes da API do Sankhya')
        console.log(error)
    }
    await AuthService.logout()
  }
}

module.exports = AppController