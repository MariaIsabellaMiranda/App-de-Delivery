const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.findAll);

module.exports = productsRoute;
