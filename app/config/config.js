/* eslint-disable security/detect-non-literal-fs-filename */
require('dotenv').config();
const fs = require('fs');
const fsPromise = require('fs/promises');

const CONFIG = {};

CONFIG.NODE_ENV = process.env.NODE_ENV;
CONFIG.PORT = process.env.PORT || 3000;
CONFIG.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
CONFIG.JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;
CONFIG.JWT_SECRET = process.env.JWT_SECRET;
CONFIG.HOST = process.env.HOST;
CONFIG.DBURI = process.env.DBURI || 'mongodb://127.0.0.1:27017';

const checkDirectories = async () => {
  const paths = ['./public', './logs'];
  const promises = [];
  paths.forEach((path) => {
    if (!fs.existsSync(path)) {
      promises.push(
        fsPromise.mkdir(path, {
          recursive: true,
        })
      );
    }
  });
  await Promise.all(promises);
};
checkDirectories();
module.exports = CONFIG;
