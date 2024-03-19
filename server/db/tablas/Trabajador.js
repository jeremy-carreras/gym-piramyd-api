const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');
const TipoUsuario = require("./TipoUsuario")

class Trabajador extends Model {}
Trabajador.init(
  {
    idTrabajador: {
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
    fechaUltimaActualizacion: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: true
    },
    usuario: {
      type: DataTypes.STRING(25),
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null
    },
    idAdmin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    sequelize,
    modelName: 'Trabajador',
    tableName: 'trabajador',
    timestamps: false,
  }
);

Trabajador.belongsTo(TipoUsuario, {
  foreignKey: {
    name: 'idTipoUsuario',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Trabajador;
