const Pago = require('../../db/tablas/Pago');
const Plan = require('../../db/tablas/Plan');
const Trabajador = require('../../db/tablas/Trabajador');
const {validarId} = require('../../helper/validar');

const pagosCliente = (body) => {
  const idCliente = validarId(body.idCliente)
  return Pago.findAll({where: {idCliente}},{include: [{model:Plan}, {model: Trabajador}]});
}

module.exports = pagosCliente;