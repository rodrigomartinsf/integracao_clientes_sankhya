'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoNegociacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TipoNegociacao.init({
    id_forma_pagamento_sankhya: DataTypes.INTEGER,
    id_forma_pagamento_ve: DataTypes.INTEGER,
    id_condicao_pagamento_ve: DataTypes.INTEGER,
    forma_pag_desc: DataTypes.STRING,
    cond_pag_desc: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'tipo_negociacao',
  });
  return TipoNegociacao;
};