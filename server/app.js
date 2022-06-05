require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./configs/db');
const userRoutes = require('./routes/user');
const apiRoutes = require('./routes/api');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/user', userRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, (err) => {
  if (!err)
    console.log(`Server running on port ${PORT}`);
  else
    console.error(`Server could not start: ${err}`);
});