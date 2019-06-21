require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Error = require('./commons/error');

const app = express();

// Database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// CORS
app.use(cors());

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

// 404
app.use((req, res, next) => next(new Error('Resource Not found', 404)));

// Error Handler
app.use(require('./middlewares/error.handler'));

// Running
app.listen(
  process.env.PORT,
  _ => console.log(`Server is running at port '${process.env.PORT}' 🤘`)
);