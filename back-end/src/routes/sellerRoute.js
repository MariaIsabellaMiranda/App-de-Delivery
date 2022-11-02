const { Router } = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRoute = Router();

sellerRoute.get('/', sellerController.findAll);

module.exports = sellerRoute;
