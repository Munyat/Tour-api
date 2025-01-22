const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`app running on port ${port}`);
});
