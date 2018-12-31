/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Product Model.
 */
const Mongoose = require('mongoose');

const Product = Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

module.exports = Mongoose.model('Product', Product);
