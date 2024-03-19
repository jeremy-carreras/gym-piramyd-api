const Cliente = require('../../db/tablas/Cliente');

const clientes = () => Cliente.findAll();

module.exports = clientes;