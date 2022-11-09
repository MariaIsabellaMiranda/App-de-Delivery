const { Router } = require('express');
const sellerController = require('../controllers/sellerController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const sellerRoute = Router();

sellerRoute.get('/', sellerController.findAll);
sellerRoute.get('/orders/:id', tokenMiddleware, sellerController.getOrder);
sellerRoute.get('/orders', tokenMiddleware, sellerController.getOrders);

module.exports = sellerRoute;
