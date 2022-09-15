const auth = require('./AuthController')
const ClienteController = require('./ClienteController')
const CidadeController = require('./CidadeController')
const EnderecoController = require('./EnderecoController')
const TipoNegociacaoController = require('./TipoNegociacaoController')
const db = require('../models')


class AppController {

  constructor() {
    this.start()
  }

  start() {
    this.insert()
  }

  async insert() {
    this.getClientesFromApi()
  }

  async getClientesFromApi() {
    try {
      const jsessionId = await auth.logon()
      const clienteService = new ClienteController(jsessionId)
      const listaClientes = await clienteService.getAll()

      //Verifica se o cliente já esta no banco de dados
      for (let i = 0; i < listaClientes.length; i++) {
        let clienteId = listaClientes[i].codigo_parceiro
        let cliente = await db.clientes.findOne({
          where: {
            codigo_parceiro: clienteId
          }
        })

        //Busca a cidade e bairro de cada cliente
        let cidadeId = listaClientes[i].cidade
        let bairroId = listaClientes[i].bairro
        const cidadeService = new CidadeController(jsessionId, cidadeId, bairroId)
        let cidadeEstado = await cidadeService.searchCidadeByCodigo()
        let bairroDescricao = await cidadeService.searchBairroByCodigo()

        //Busca o endereço de cada cliente
        let enderecoId = listaClientes[i].endereco
        const enderecoService = new EnderecoController(jsessionId, enderecoId)
        let enderecoDescricao = await enderecoService.searchEnderecoByCodigo()
        
        //Busca o tipo de negociação de cada cliente
        const tipoNegociacaoService = new TipoNegociacaoController(jsessionId, clienteId)
        const tipoNegociacaoDescricao = await tipoNegociacaoService.searchTipoNegociacaoByCodigoParceiro()
        
        //Verifica se o cliente foi encontado no banco de dados. 
        //Caso já tenha o cliente cadastrado faz o Update
        if(cliente){
          let clienteAtualizado = []
          clienteAtualizado = listaClientes[i]
          clienteAtualizado.cidade = cidadeEstado.cidade
          clienteAtualizado.estado = cidadeEstado.estado
          clienteAtualizado.endereco = enderecoDescricao
          clienteAtualizado.prazo = tipoNegociacaoDescricao
          await db.clientes.update(clienteAtualizado, {
            where: {
              codigo_parceiro: clienteId
            }
          })
          console.log(listaClientes[i].nome_parceiro)
        }
        //Caso contrário, Cadastra o cliente
        else{
          const novoCliente = listaClientes[i]
          novoCliente.cidade = cidadeEstado.cidade
          novoCliente.estado = cidadeEstado.estado
          novoCliente.endereco = enderecoDescricao
          novoCliente.prazo = tipoNegociacaoDescricao
          await db.clientes.create(novoCliente)
          console.log('Novo cliente Cadastrado', listaClientes[i].nome_parceiro)
        }
      }
    } catch (error) {
        console.log('Erro ao recuperar os clientes da API do Sankhya')
    }
    await auth.logout()
  }
}

module.exports = AppController