const Plan = require('../../db/tablas/Plan');

const planes = () => Plan.findAll();

module.exports = planes;