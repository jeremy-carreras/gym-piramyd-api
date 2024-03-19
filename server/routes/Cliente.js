const express = require('express');
const app = express();
const nuevo = require('../controller/Cliente/nuevo');
const cliente = require('../controller/Cliente/cliente');
const clientes = require('../controller/Cliente/clientes');
const modificar = require('../controller/Cliente/modificar');

app.post(`/Cliente/nuevo`, (req, res) => {
  return nuevo(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Cliente/clientes`, (req, res) => {
  return clientes(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Cliente/cliente`, (req, res) => {
  return cliente(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.put(`/Cliente/cliente`, (req, res) => {
  return modificar(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});



module.exports = app;
