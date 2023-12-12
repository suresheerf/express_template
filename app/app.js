const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const AppError = require('./utils/appError');

const userRoutes = require('./user/userRoutes');
const globalErrHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// middleware

app.use(
  morgan(
    (tokens, req, res) =>
      JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat(tokens['response-time'](req, res)),
      }),
    {
      stream: {
        write: (message) => logger.info('accessLog', JSON.parse(message)),
      },
    }
  )
);

app.use('/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrHandler);

module.exports = app;

// @types/cors @types/express @types/morgan @types/swagger-jsdoc @types/swagger-ui-express eslint eslint-config-airbnb-base eslint-config-node eslint-config-prettier eslint-plugin-node eslint-plugin-prettier eslint-plugin-security prettier
