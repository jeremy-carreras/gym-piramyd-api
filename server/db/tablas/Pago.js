const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');
const Cliente = require("./Cliente")
const Trabajador = require("./Trabajador")
const Plan = require("./Plan")

class Pago extends Model {}
Pago.init(
  {
    idPago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    folio: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaPago: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW")
    },
  },
  {
    sequelize,
    modelName: 'Pago',
    tableName: 'pago',
    timestamps: false,
  }
);

Pago.belongsTo(Cliente, {
  foreignKey: {
    name: 'idCliente',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Pago.belongsTo(Trabajador, {
  foreignKey: {
    name: 'idTrabajador',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Pago.belongsTo(Plan, {
  foreignKey: {
    name: 'idPlan',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Pago;
