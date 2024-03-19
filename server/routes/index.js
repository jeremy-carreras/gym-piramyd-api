const express = require("express");
const app = express();

app.use(require('./Trabajador'));
app.use(require('./Cliente'));
app.use(require('./Pago'));
app.use(require('./Plan'));

module.exports = app;
