const express = require('express');
const app = express();
const login = require('../controller/Trabajador/login');
const trabajadores = require('../controller/Trabajador/trabajadores');
const trabajador = require('../controller/Trabajador/trabajador');
const nuevo = require('../controller/Trabajador/nuevo');
const update = require('../controller/Trabajador/update');

app.post(`/Trabajador/login`, (req, res) => {
  return login(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.post(`/Trabajador/nuevo`, (req, res) => {
  return nuevo(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Trabajador/trabajadores`, (req, res) => {
  return trabajadores(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Trabajador/trabajador`, (req, res) => {
  return trabajador(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.put(`/Trabajador/update`, (req, res) => {
  return update(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});



module.exports = app;
