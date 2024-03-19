const express = require('express');
const app = express();
const nuevo = require('../controller/Plan/nuevo');
const planes = require('../controller/Plan/planes');
const update = require('../controller/Plan/update');

app.post(`/Plan/nuevo`, (req, res) => {
  return nuevo(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get(`/Plan/planes`, (req, res) => {
  return planes()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.put(`/Plan/update`, (req, res) => {
  return update(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = app;
