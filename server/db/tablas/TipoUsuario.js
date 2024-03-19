const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

class TipoUsuario extends Model {}
TipoUsuario.init(
  {
    idTipoUsuario: {
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
  },
  {
    sequelize,
    modelName: 'TipoUsuario',
    tableName: 'tipoUsuario',
    timestamps: false,
  }
);

module.exports = TipoUsuario;
