const mongoose = require('mongoose');
const { PORT, DBURI } = require('./config/config');
const app = require('./app');

const server = app
  .listen(PORT, '0.0.0.0', () => {
    console.log(`server listening on port ${PORT}`);
  })
  .on('error', (err) => {
    console.log('err:', err);
    process.exit(1);
  });
mongoose
  .connect(DBURI)
  .then(async () => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log('Error:', err);
  });
process.on('unhandledRejection', () => {
  console.log('unhandledRejection');
  process.exit(1);
});
