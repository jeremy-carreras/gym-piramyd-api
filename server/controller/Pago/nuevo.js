const moment = require('moment');
const { validarId } = require(`../../helper/validar`);
const { validar } = require('../../helper/validar');
const Pago = require('../../db/tablas/Pago');
const Cliente = require('../../db/tablas/Cliente');
const Trabajador = require('../../db/tablas/Trabajador');
const Plan = require('../../db/tablas/Plan');

const nuevo = async (body) => {
  console.log(body);
  const idCliente = validarId(body.idCliente, 'idCliente');
  const idPlan = validarId(body.idPlan, 'idPlan');
  const idTrabajador = validarId(body.idTrabajador, 'idTrabajador');
  const cantidad = validarId(body.cantidad, 'cantidad');
  const monto = validarId(body.monto, 'monto');
  let idPago = null;

  return Cliente.findOne({ where: { idCliente } })
    .then((res) => {
      if (!res) throw new Error('No se ha encontrado un cliente con ese id.');
      return Trabajador.findOne({ where: { idTrabajador } });
    })
    .then((res) => {
      if (!res)
        throw new Error('No se ha encontrado un trabajador con ese id.');
      return Plan.findOne({ where: { idPlan } });
    })
    .then((res) => {
      if (!res) throw new Error('No se ha encontrado un plan con ese id.');
      const fecha = moment();
      return Pago.create({
        idCliente,
        idTrabajador,
        idPlan,
        monto,
        cantidad,
        fechaPago: fecha,
      });
    })
    .then(async (res) => {
      idPago = res.idPago;
      res.folio = `PYR-${res.idPago}`;
      return res.save();
    })
    .then((res) => {
      let plan = null;
      if (idPlan === 1) plan = 'w';
      if (idPlan === 2) plan = 'M';
      if (idPlan === 3) plan = 'y';
      Cliente.findOne({ where: { idCliente } }).then(async (res) => {
        res.fechaUltimoPago = moment();
        if (!res.fechaProximoPago)
          res.fechaProximoPago = moment().add(cantidad, plan);
        else {
          if (!moment(res.fechaProximoPago).isAfter(moment()))
            res.fechaProximoPago = moment().add(cantidad, plan);
          else
            res.fechaProximoPago = moment(res.fechaProximoPago).add(
              cantidad,
              plan
            );
        }
        return res.save();
      });
    })
    .then((res) => {
      return Pago.findOne({
        where: idPago,
        include: [{ model: Trabajador }, { model: Plan }],
      });
    })
    .then((res) => ({
      message: `Se resgistró correctamente este pago.`,
      data: res,
    }));
};

module.exports = nuevo;
