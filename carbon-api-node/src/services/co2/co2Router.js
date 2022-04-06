const express = require('express');
const co2Router = express.Router();

const co2Controller = require('./co2Controller');

//RENDER
co2Router.get('/calculate', (req, res) => {
    co2Controller.calculate(req, res)
});


module.exports = co2Router;