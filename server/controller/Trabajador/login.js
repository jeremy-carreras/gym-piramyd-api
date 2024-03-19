const helperPath = '../../helper';
const { comparar } = require(`${helperPath}/encriptar`);
const validar = require(`${helperPath}/validar`);
const Trabajador = require(`../../db/tablas/Trabajador`);

const login = async (body) => {
  const usuario = validar.validar(body.usuario, 'usuario');
  const password = validar.validar(body.password, 'contraseña');

  return Trabajador.findOne({
    where: { usuario },
  })
    .then((res) => {
      if (!res) throw new Error('No existe este usuario.');
      if (!comparar(password, res.password))
        throw new Error('La contraseña es incorrecta.');
      return res
    })
    .then((res) => ({
      Usuario: res,
      mensaje: "Has iniciado sesión con éxito"
    }));
};

module.exports = login;
