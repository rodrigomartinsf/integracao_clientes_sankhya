'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rotas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Rotas.init({
    id_rota_sankhya: DataTypes.INTEGER,
    id_rota_ve: DataTypes.INTEGER,
    rota_desc: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'rotas',
  });
  return Rotas;
};