const Pago = require('../../db/tablas/Pago');
const Plan = require('../../db/tablas/Plan');
const Trabajador = require('../../db/tablas/Trabajador');

const pagos = () => Pago.findAll({include: [{model:Plan}, {model: Trabajador}]});

module.exports = pagos;