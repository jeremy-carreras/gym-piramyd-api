const helperPath = '../../helper';
const {validarId} = require(`${helperPath}/validar`);
const Cliente = require('../../db/tablas/Cliente');

const clientes = async (query) => {
  const idCliente = validarId(query.idCliente)
  return Cliente.findOne({ where: { idCliente } }).then(res => {
    if(!res) throw new Error("No se ha encontrado un cliente con ese id.")
    console.log(res)
    return res.dataValues;
  })
}

module.exports = clientes;
