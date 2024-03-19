const validar = require(`../../helper/validar`);
const Plan = require('../../db/tablas/Plan');

const nuevo = async (body) => {
  const nombre = validar.validar(body.nombre);
  const precio = validar.validarNumero(body.precio);

  return Plan.findOne({ where: {nombre: nombre} })
    .then((res) => {
      if (res)
        throw new Error('Ese nombre ya ha sido registrado en otro plan.');
      return Plan.create({
        nombre,
        precio,
      });
    })
    .then((res) => ({
      message: `Se resgistró correctamente este plan.`,
      data: res
    }));
};

module.exports = nuevo;
