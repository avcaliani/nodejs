const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Environment Config
dotenv.config();

// Database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// CORS
app.use(cors());

// Log Handler
app.use(morgan('dev'));

// Static Content
app.use('/uploads', express.static(
  path.resolve(__dirname, '..', process.env.STATIC_FILES_DIR)
));

// Body Parser Handler
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Registering Routes
app.use('/orders', require('./components/order/order.routes'));
app.use('/products', require('./components/product/product.routes'));
app.use('/users', require('./components/user/user.routes'));

// Error Handler
app.use(require('./middlewares/error.handler'));

app.listen(
  process.env.PORT,
  _ => console.log(`Server running at '${process.env.PORT}' \\o/`)
);