const bcrypt = require('bcrypt');
const validar = require('./validar');
require('../config/config');

const comparar = (password, dbPassword) => {
  let campo = 'password';

  validar.noHay(password, campo);
  if (typeof password != 'string') validar.noValido(campo);
  if (!bcrypt.compareSync(password, dbPassword))
    throw new Error('Usuario o contraseña no validos.');
  return true;
};

const encriptar = (password) => {
  let campo = 'password';

  validar.noHay(password, campo);
  if (typeof password != 'string') validar.noValido(campo);
  return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
};

const generarPassword = () => {
  let length = 8;
  let charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';

  for (let i = 0, n = charset.length; i < length; ++i)
    password += charset.charAt(Math.floor(Math.random() * n));
  return password;
};

module.exports = { comparar, encriptar, generarPassword };
