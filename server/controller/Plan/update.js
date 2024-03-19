const validar = require(`../../helper/validar`);
const Plan = require('../../db/tablas/Plan');

const nuevo = async (body) => {
  const idPlan = validar.validarId(body.idPlan);
  let nombre;
  let precio;

  return Plan.findOne({ where: idPlan })
    .then((res) => {
      if (!res) throw new Error('No existe ningún plan con este id.');
      if(body.nombre) {
        nombre = validar.validar(body.nombre);
        res.nombre = nombre
      }
      if(body.precio){
        precio = validar.validarNumero(body.precio);
        res.precio = precio
      }
      return res.save()
    })
    .then((res) => ({
      message: `Se editó correctamente este plan.`,
      data: res,
    }));
};

module.exports = nuevo;
