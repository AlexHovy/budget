const bodyParser = require('body-parser');
const express = require('express');
const connectDB = require('./config/db');
const categories = require('./routes/api/categories');

const app = express();

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/categories', categories);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));