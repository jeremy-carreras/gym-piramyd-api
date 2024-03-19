const helperPath = '../../helper';
const {
  validar,
  validarId,
  validarCorreo,
  validarFecha,
} = require(`${helperPath}/validar`);
const Cliente = require(`../../db/tablas/Cliente`);

const nuevo = async (body) => {
  const idCliente = validarId(body.idCliente)
  const dataUpdate = {};

  return Cliente.findOne({ where: idCliente }).then(res => {
    if(!res) throw new Error("No existe ningun cliente con este id.")
    if(body.nombre) dataUpdate.nombre = validar(body.nombre, "El nombre");
    if(body.fechaNacimiento) dataUpdate.fechaNacimiento = validarFecha(body.fechaNacimiento);
    if(body.fechaUltimoPago) dataUpdate.fechaUltimoPago = validarFecha(body.fechaUltimoPago);
    if(body.fechaProximoPago) dataUpdate.fechaProximoPago = validarFecha(body.fechaProximoPago);
    if(body.telefono) dataUpdate.telefono = validar(body.telefono, "El telefono");
    if(body.telefonoEmergencia) dataUpdate.telefonoEmergencia = validar(body.telefonoEmergencia, "El telefono de emergencia");
    if(body.correo) dataUpdate.correo = validarCorreo(body.correo);
    if(body.tipoSangre) dataUpdate.tipoSangre = validar(body.tipoSangre, "El tipo de sangre");
    return Cliente.update(dataUpdate, { where: { idCliente } });
  })
  .then((res) => ({
    message: 'Se guardaron correctamente los cambios de este cliente.',
    data: res
  }));
};

module.exports = nuevo;
