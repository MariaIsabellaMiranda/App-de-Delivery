const { Router } = require('express');
const sellerController = require('../controllers/sellerController');
const validateSales = require('../middlewares/validateSales');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const sellerRoute = Router();

sellerRoute.get('/', tokenMiddleware, validateSales, sellerController.findAll);

module.exports = sellerRoute;
