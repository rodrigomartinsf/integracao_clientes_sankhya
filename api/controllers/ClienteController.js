const axios = require('axios').default

class ClienteController {
  constructor(jsessionid){
    this.jsessionid = jsessionid
    this.headers = {'Cookie': `JSESSIONID=${jsessionid}`}
    this.url = "http://navecunha.nuvemdatacom.com.br:9665/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json"
    this.body = {"serviceName": "CRUDServiceProvider.loadRecords","requestBody": {"dataSet": {"rootEntity": "Parceiro","includePresentationFields": 
                         "N","offsetPage": "0","criteria": {"expression": {"$": "this.CLIENTE = 'S'"}},"entity": {"fieldset": {
                         "list": "CODPARC,RAZAOSOCIAL,NOMEPARC,TIPPESSOA,CGC_CPF,IDENTINSCESTAD,DTNASC,CODVEND,PRAZOPAG,CEP,COMPLEMENTO,CODBAI,CODCID,CODTAB,BLOQUEAR,ATIVO,CODEND,NUMEND,LATITUDE,LONGITUDE"}}}}}
  }

  getHeaders(){
    return this.headers
  }
    
  getUrl(){
    return this.url
  }

  getBody(){
    return this.body
  }

  async getAll() {
    let i = 0
    const listaClientes = []
    try {
      const res = await axios.post(this.getUrl(), this.getBody(), { headers: this.getHeaders() } )
      const clientes =  Object.values(res.data.responseBody.entities.entity) 
      clientes.forEach(cliente => {
        listaClientes[i] = {'codigo_parceiro': cliente['f0']['$'], 
                            'razao_social': cliente['f1']['$'],
                            'nome_parceiro': cliente['f2']['$'],
                            'tipo_pessoa': cliente['f3']['$'],
                            'cgc_cpf': cliente['f4']['$'],
                            'inscricao_estadual': cliente['f5']['$'],
                            'data_nascimento': cliente['f6']['$'],
                            'rota': cliente['f7']['$'],
                            'prazo': cliente['f8']['$'],
                            'cep': cliente['f9']['$'],
                            'complemento': cliente['f10']['$'],
                            'bairro': cliente['f11']['$'],
                            'cidade': cliente['f12']['$'],
                            'tabela_preco': cliente['f13']['$'],
                            'bloquear': cliente['f14']['$'],
                            'ativo': cliente['f15']['$'],
                            'endereco': cliente['f16']['$'],
                            'numero': cliente['f17']['$'],
                            'latitude': cliente['f18']['$'],
                            'longitude': cliente['f19']['$']
                            }
        i++
        return listaClientes
        })
      return listaClientes
    } catch (error) {
      console.log('Erro de conexão com a API')
    }
    
  }
}
module.exports = ClienteController