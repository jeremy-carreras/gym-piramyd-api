const moment = require('moment');
const { validarId, validarAlfanumerico, validar } = require(`../../helper/validar`);
const { encriptar } = require('../../helper/encriptar');
const TipoUsuario = require('../../db/tablas/TipoUsuario');
const Trabajador = require('../../db/tablas/Trabajador');

const nuevo = async (body) => {
  const idTipoUsuario = validarId(body.idTipoUsuario);
  const idAdmin = validarId(body.idAdmin);
  const nombre = validar(body.nombre);
  const usuario = validar(body.usuario);
  const password = validarAlfanumerico(body.password);
  let telefono = null
  if(body.telefono) {
    telefono = validar(body.telefono);
  }

  return TipoUsuario.findOne({ where: { idTipoUsuario } })
  .then((res) => {
    if (!res)
      throw new Error('No se ha encontrado un tipoUsuario con ese id.');
    return Trabajador.findOne({ where: { idTrabajador: idAdmin, idTipoUsuario: 1 } });
  })
    .then((res) => {
      if (!res) throw new Error('No se ha encontrado un admin con ese id.');
      const fecha = moment();
      return Trabajador.create({
        idTipoUsuario,
        nombre,
        usuario,
        password: encriptar(password),
        idAdmin,
        fechaUltimaActualizacion: fecha,
        telefono
      });
    })
    .then((res) => {
      delete res.dataValues.password;
      return {
        message: "Se ha registrado el trabajador de forma exitosa.",
        data: res
      }
    });
};

module.exports = nuevo;
