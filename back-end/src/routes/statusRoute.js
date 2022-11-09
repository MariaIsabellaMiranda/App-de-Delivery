const { Router } = require('express');
const statusController = require('../controllers/statusController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const validateStatus = require('../middlewares/validateStatus');

const statusRoute = Router();

statusRoute.put('/', tokenMiddleware, validateStatus, statusController.update);

module.exports = statusRoute;
