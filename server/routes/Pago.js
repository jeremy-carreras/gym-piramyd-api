const express = require('express');
const app = express();
const nuevo = require('../controller/Pago/nuevo');
const pago = require('../controller/Pago/pago');
const pagos = require('../controller/Pago/pagos');
const pagosCliente = require('../controller/Pago/pagosCliente');

app.post(`/Pago/nuevo`, (req, res) => {
  return nuevo(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Pago/pagos`, (req, res) => {
  return pagos()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Pago/pagosCliente`, (req, res) => {
  return pagosCliente(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Pago/pago`, (req, res) => {
  return pago(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = app;
