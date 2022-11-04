const { Router } = require('express');
const customerController = require('../controllers/customerController');
const validateSales = require('../middlewares/validateSales');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const customerRoute = Router();

customerRoute.post('/checkout', tokenMiddleware, validateSales, customerController.createSale);

customerRoute.get('/orders/:id', tokenMiddleware, customerController.getOrder);

customerRoute.get('/orders', tokenMiddleware, customerController.getOrders);

module.exports = customerRoute;
