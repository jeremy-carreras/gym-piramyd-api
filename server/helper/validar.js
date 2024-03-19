const moment = require('moment');
const validator = require('validator');

const noValido = (campo) => {
  throw new Error(`${campo} no es valido.`);
};

const noHay = (variable, campo) => {
  if (!variable) throw new Error(`Falta ${campo}.`);
};

const yaExiste = (campo) => {
  throw new Error(`${campo} ya se encuentra en uso.`);
};

const validar = (texto, campo, length) => {
  noHay(texto, campo);
  if (typeof texto !== 'string' || (length && texto.length > length))
    noValido(campo);
  return texto;
};

const validarId = (id) => {
  let campo = 'El id';

  noHay(id, campo);
  if (typeof id === 'number') id = id.toString();
  if (typeof id !== 'string' || !validator.isNumeric(id, { no_symbols: true }))
    noValido(campo);
  return Number(id);
};

const validarCorreo = (correo) => {
  let campo = 'El correo';

  noHay(correo, campo);
  if (typeof correo !== 'string' || !validator.isEmail(correo)) noValido(campo);
  return correo;
};

const caracteresEspeciales = (char) => {
  const charset = [
    ' ',
    '.',
    '-',
    ',',
    '/',
    '#',
    '?',
    '¿',
    ':',
    ';',
    '"',
    "'",
    '_',
    '%',
    '\n',
  ];

  for (let i = 0; i < charset.length; i++) if (charset[i] === char) return true;
  return false;
};

const validarTexto = (texto, campo, length) => {
  noHay(texto, campo);
  if (typeof texto !== 'string' || texto.length > length) noValido(campo);
  for (let i = 0; i < texto.length; i++) {
    if (caracteresEspeciales(texto[i])) continue;
    if (!validator.isAlpha(texto[i], 'es-ES')) noValido(campo);
  }
  return texto;
};

const validarAlfanumerico = (texto, campo, length) => {
  noHay(texto, campo);
  if (typeof texto !== 'string' || texto.length > length) noValido(campo);
  for (let i = 0; i < texto.length; i++) {
    if (caracteresEspeciales(texto[i])) continue;
    if (!validator.isAlphanumeric(texto[i], 'es-ES')) noValido(campo);
  }
  return texto;
};

const validarNumeroCuenta = (numeroCuenta) => {
  let campo = 'El numero de cuenta';

  noHay(numeroCuenta, campo);
  if (
    typeof numeroCuenta !== 'string' ||
    !validator.isNumeric(numeroCuenta, { no_symbols: true }) ||
    numeroCuenta.length > 9
  )
    noValido(campo);
  return numeroCuenta;
};

const validarFecha = (fecha) => {
  let campo = 'La fecha';
  let fechaMoment = moment(fecha);

  noHay(fecha, campo);
  if (!fechaMoment.isValid()) noValido(campo);
  return fechaMoment;
};

const validarNumero = (numero, makeNumber = false, length) => {
  let campo = 'El numero';

  noHay(numero, campo);
  if (
    typeof numero !== 'string' ||
    !validator.isNumeric(numero, { no_symbols: true }) ||
    (length && numero.length > length)
  )
    noValido(campo);
  if (makeNumber) return Number(numero);
  return numero;
};

const validarAccesibilidad = (usuariosValidos = [], idTipoUsuario) => {
  for (let i = 0; i < usuariosValidos.length; i++)
    if (idTipoUsuario === usuariosValidos[i]) return;
  throw new Error('Este usuario no tiene permitido usar esta linea de la API.');
};

const validarObjetoVacio = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

module.exports = {
  validar,
  noValido,
  yaExiste,
  noHay,
  validarCorreo,
  validarId,
  validarTexto,
  validarAlfanumerico,
  validarNumeroCuenta,
  validarFecha,
  validarNumero,
  validarAccesibilidad,
  validarObjetoVacio,
};
