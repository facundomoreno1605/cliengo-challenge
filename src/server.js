const express = require('express');
const setRoutes = require('./routes');
const { errorHandlerMiddleware } = require('./middlewares');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());

setRoutes(app);

app.use(errorHandlerMiddleware);

module.exports = app;
