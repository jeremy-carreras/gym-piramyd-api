const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

class Cliente extends Model {}
Cliente.init(
  {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaUltimoPago: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true
    },
    fechaProximoPago: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(15),
      defaultValue: null
    },
    telefonoEmergencia: {
      type: DataTypes.STRING(15),
      defaultValue: null
    },
    correo: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    tipoSangre: {
      type: DataTypes.STRING(8),
      defaultValue: null,
    },
  },
  {
    sequelize,
    initialAutoIncrement: 1000,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false,
  }
);

module.exports = Cliente;
