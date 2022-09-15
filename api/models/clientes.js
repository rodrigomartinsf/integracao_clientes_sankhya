'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clientes.init({
    codigo_parceiro: DataTypes.INTEGER,
    razao_social: DataTypes.STRING,
    nome_parceiro: DataTypes.STRING,
    tipo_pessoa: DataTypes.STRING,
    cgc_cpf: DataTypes.STRING,
    inscricao_estadual: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    rota: DataTypes.INTEGER,
    prazo: DataTypes.STRING,
    cep: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    tabela_preco: DataTypes.INTEGER,
    bloquear: DataTypes.STRING,
    integrado: DataTypes.STRING,
    ativo: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    codigo_ve: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return Clientes;
};