'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TabelaPreco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TabelaPreco.init({
    id_tabela_preco_sankhya: DataTypes.INTEGER,
    id_tabela_preco_ve: DataTypes.INTEGER,
    tabela_preco_desc: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'tabela_preco',
  });
  return TabelaPreco;
};