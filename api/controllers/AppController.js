const AuthServiceController = require('./AuthServiceController')
const ClienteServiceController = require('./ClienteServiceController')
const CidadeServiceController = require('./CidadeServiceController')
const EnderecoServiceController = require('./EnderecoServiceController')
const TipoNegociacaoServiceController = require('./TipoNegociacaoServiceController')
const ClienteController = require('./ClienteController')
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
      const jsessionId = await AuthServiceController.logon()
      const clienteService = new ClienteServiceController(jsessionId)
      const listaClientes = await clienteService.getAll()

      //Verifica se o cliente já esta no banco de dados
      for (let i = 0; i < listaClientes.length; i++) {
        const novoCliente = new ClienteController(listaClientes[i].codigo_parceiro, listaClientes[i].razao_social, listaClientes[i].nome_parceiro, listaClientes[i].tipo_pessoa, 
                                              listaClientes[i].cgc_cpf, listaClientes[i].inscricao_estadual, listaClientes[i].data_nascimento, listaClientes[i].rota, 
                                              listaClientes[i].prazo, listaClientes[i].cep, listaClientes[i].complemento, listaClientes[i].bairro, listaClientes[i].cidade, 
                                              listaClientes[i].tabela_preco, listaClientes[i].bloquear, listaClientes[i].ativo, listaClientes[i].endereco, listaClientes[i].numero, 
                                              listaClientes[i].latitude, listaClientes[i].longitude)
        let clienteModel = await db.clientes.findOne({
          where: {
            codigo_parceiro: novoCliente.getCodigoParceiro()
          }
        })

        //Busca a cidade e bairro de cada cliente
        let cidadeId = novoCliente.getCidade()
        let bairroId = novoCliente.getBairro()
        const cidadeService = new CidadeServiceController(jsessionId, cidadeId, bairroId)
        let cidadeEstado = await cidadeService.searchCidadeByCodigo()
        let bairroDescricao = await cidadeService.searchBairroByCodigo()
        novoCliente.setCidade(cidadeEstado.cidade)
        novoCliente.setEstado(cidadeEstado.estado)
        novoCliente.setBairro(bairroDescricao)

        //Busca o endereço de cada cliente
        let enderecoId = listaClientes[i].endereco
        const enderecoService = new EnderecoServiceController(jsessionId, enderecoId)
        let enderecoDescricao = await enderecoService.searchEnderecoByCodigo()
        novoCliente.setEndereco(enderecoDescricao)
        
        //Busca o tipo de negociação de cada cliente
        const tipoNegociacaoService = new TipoNegociacaoServiceController(jsessionId, novoCliente.getCodigoParceiro())
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
          console.log('Novo cliente Cadastrado', listaClientes[i].nome_parceiro)
        }
      }
    } catch (error) {
        console.log('Erro ao recuperar os clientes da API do Sankhya')
        console.log(error)
    }
    await AuthServiceController.logout()
  }
}

module.exports = AppController