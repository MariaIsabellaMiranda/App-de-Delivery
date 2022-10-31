require('express-async-errors');
const express = require('express');
const cors = require('cors');
const commonRoute = require('../routes/commonRoute');
const productsRoute = require('../routes/productsRoute');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/images', express.static(__dirname + '/../images'));

app.use('/common', commonRoute);

app.use('/products', productsRoute);

app.use(errorMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
