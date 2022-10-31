const { Router } = require('express');
const validateLogin = require('../middlewares/validateLogin');
const loginController = require('../controllers/loginController');

const commonRoute = Router();

commonRoute.post('/login', validateLogin, loginController.post);

module.exports = commonRoute;
