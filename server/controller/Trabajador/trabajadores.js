const Trabajador = require('../../db/tablas/Trabajador');

const trabajadores = () => {
  return Trabajador.findAll().then((res) => {
    if (!res) throw new Error('No hay trabajadores');
    for(let i = 0; i < res.length; i++){
      delete res[i].dataValues.password;
    }
    return res;
  });
};

module.exports = trabajadores;
