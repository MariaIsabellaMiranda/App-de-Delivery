const { Router } = require('express');
const statusController = require('../controllers/statusController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const statusRoute = Router();

statusRoute.put('/', tokenMiddleware, statusController.update);

module.exports = statusRoute;
