const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const appError = require('./utils/appError');

const userRoutes = require('./routes/userRoutes');
const globalErrHandler = require('./controllers/errorController');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrHandler);

module.exports = app;

// @types/cors @types/express @types/morgan @types/swagger-jsdoc @types/swagger-ui-express eslint eslint-config-airbnb-base eslint-config-node eslint-config-prettier eslint-plugin-node eslint-plugin-prettier eslint-plugin-security prettier
