require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./configs/db');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/api', routes);

app.listen(PORT, () => (error) => {
  if (!error)
    console.log(`Server running on port ${PORT}`);
  else
    console.error(`Server could not start: ${error}`);
});