const { Router } = require('express');
const validateLogin = require('../middlewares/validateLogin');
const validateRegister = require('../middlewares/validateRegister');
const commonController = require('../controllers/commonController');

const commonRoute = Router();

commonRoute.post('/login', validateLogin, commonController.login);

commonRoute.post('/register', validateRegister, commonController.register);

module.exports = commonRoute;
