const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/loginRoute');

const app = express();

app.use(cors());

app.use('/login', loginRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
