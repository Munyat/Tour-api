const mongoose = require('mongoose');

//
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught exception');

  process.exit(1);
});

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`app running on port ${port}`);
});

//handles unhandles rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection');
  server.close(() => {
    process.exit(1);
  });
});
