const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

class Plan extends Model {}
Plan.init(
  {
    idPlan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'Plan',
    tableName: 'plan',
    timestamps: false,
  }
);

module.exports = Plan;
