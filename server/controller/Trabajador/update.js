const moment = require('moment');
const validar = require(`../../helper/validar`);
const Trabajador = require('../../db/tablas/Trabajador');
const { encriptar } = require('../../helper/encriptar');

const nuevo = async (body) => {
  const idTrabajador = validar.validarId(body.idTrabajador);

  return Trabajador.findOne({ where: idTrabajador })
    .then((res) => {
      if (!res) throw new Error('No existe ningún trabajador con este id.');
      if (body.nombre) {
        let nombre = validar.validar(body.nombre);
        res.nombre = nombre;
      }
      if (body.usuario) {
        let usuario = validar.validar(body.usuario);
        res.usuario = usuario;
      }
      if (body.password) {
        let password = validar.validar(body.password);
        res.password = encriptar(password);
      }
      if (body.idAdmin) {
        let idAdmin = validar.validarId(body.idAdmin);
        res.idAdmin = idAdmin;
      }
      if (body.telefono) {
        let telefono = validar.validar(body.telefono);
        res.telefono = telefono;
      }
      res.fechaUltimaActualizacion = moment()
      return res.save();
    })
    .then((res) => {
      delete res.dataValues.password;
      return {
        message: `Se editó correctamente este trabajador.`,
        data: res,
      }
    });
};

module.exports = nuevo;
