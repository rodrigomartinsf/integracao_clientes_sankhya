const db = require('../models')

class TabelaPrecoController {

  static async getTabelaPrecoIdVendasExternas(id) {
    const tabelaPreco = await db.tabela_preco.findOne({ where: { id_tabela_preco_sankhya: id } })
    return tabelaPreco
  }

}

module.exports = TabelaPrecoController