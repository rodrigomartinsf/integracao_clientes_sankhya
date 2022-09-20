const ClienteService = require('../services/ClienteService')
const CidadeService = require('../services/CidadeService')
const EnderecoService = require('../services/EnderecoService')
const TipoNegociacaoService = require('../services/TipoNegociacaoService')
const ClienteSchema = require('../schemas/ClienteSchema')

const db = require('../models')

class ClienteController {

  constructor(jsessionId) {
    this.jsessionId = jsessionId
    this.clienteService = new ClienteService(jsessionId)
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
        const clienteSchema = new ClienteSchema(listaClientes[i].codigo_parceiro, listaClientes[i].razao_social, listaClientes[i].nome_parceiro, listaClientes[i].tipo_pessoa, 
                                              listaClientes[i].cgc_cpf, listaClientes[i].inscricao_estadual, listaClientes[i].data_nascimento, listaClientes[i].rotaId, 
                                              listaClientes[i].prazo, listaClientes[i].cep, listaClientes[i].complemento, listaClientes[i].bairro, listaClientes[i].cidade, 
                                              listaClientes[i].tabela_preco, listaClientes[i].bloquear, listaClientes[i].ativo, listaClientes[i].endereco, listaClientes[i].numero, 
                                              listaClientes[i].latitude, listaClientes[i].longitude)

        const clienteModel = await db.clientes.findOne({ where: { codigo_parceiro: clienteSchema.getCodigoParceiro() } })

        //Busca a cidade e bairro de cada cliente
        let cidadeId = clienteSchema.getCidade()
        let bairroId = clienteSchema.getBairro()
        const cidadeService = new CidadeService(this.jsessionId, cidadeId, bairroId)
        let cidadeEstado = await cidadeService.searchCidadeByCodigo()
        let bairroDescricao = await cidadeService.searchBairroByCodigo()
        clienteSchema.setCidade(cidadeEstado.cidade)
        clienteSchema.setEstado(cidadeEstado.estado)
        clienteSchema.setBairro(bairroDescricao)

        //Busca o endereço de cada cliente
        let enderecoId = clienteSchema.getEndereco()
        const enderecoService = new EnderecoService(this.jsessionId, enderecoId)
        let enderecoDescricao = await enderecoService.searchEnderecoByCodigo()
        clienteSchema.setEndereco(enderecoDescricao)
        
        //Busca o tipo de negociação de cada cliente
        const tipoNegociacaoService = new TipoNegociacaoService(this.jsessionId, clienteSchema.getCodigoParceiro())
        const tipoNegociacaoDescricao = await tipoNegociacaoService.searchTipoNegociacaoByCodigoParceiro()
        clienteSchema.setPrazo(tipoNegociacaoDescricao)
        
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
}

module.exports = ClienteController