const helperPath = '../../helper';
const {validarId} = require(`${helperPath}/validar`);
const Trabajador = require('../../db/tablas/Trabajador');

const trabajador = async (query) => {
  const idTrabajador = validarId(query.idTrabajador)
  return Trabajador.findOne({ where: { idTrabajador } }).then(res => {
    if(!res) throw new Error("No se ha encontrado un cliente con ese id.")
    return res.dataValues;
  })
}

module.exports = trabajador;
