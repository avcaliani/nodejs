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
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = Mongoose.model('Product', Product);
