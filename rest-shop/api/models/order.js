/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Product Model.
 */
const Mongoose = require('mongoose');

const Order = Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  product: { type: Mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 }
});

module.exports = Mongoose.model('Order', Order);
