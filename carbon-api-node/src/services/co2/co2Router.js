const express = require('express');
const co2Router = express.Router();

const co2Controller = require('./co2Controller');

co2Router.get('/ping', (req, res) => {
    res.send('pong')
  });

//RENDER
co2Router.get('/calculate', (req, res) => {
    co2Controller.calculate(req, res)
});


module.exports = co2Router;