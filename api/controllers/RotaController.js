const db = require('../models')

class RotaController {

  static async getRotaIdVendasExternas(id) {
    const rota = await db.rotas.findOne({ where: { id_rota_sankhya: id } })
    return rota
  }

}

module.exports = RotaController