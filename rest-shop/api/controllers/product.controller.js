/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Product Controller.
 */
const Mongoose = require('mongoose');
const Product = require('../models/product.model');

/**
 * Find all Products.
 * @return {Promise} List of Products or Error.
 */
exports.findAll = () => {
  return new Promise((resolve, reject) => {
    Product.find()
      .select('_id name price image') // Find only these fields
      .exec()
      .then(documents => {
        const data = {
          count: documents.length,
          products: documents.map(doc => {
            return parse(doc, { type: 'GET', url: `/products/${doc._id}` });
          })
        };
        resolve(data);
      })
      .catch(reject);
  });
};

/**
 * Find a product by id.
 * @param {*} id Product ID.
 * @return {Promise} Product or Error.
 */
exports.find = (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id)
    .exec()
    .then(result => resolve(parse(result)))
    .catch(reject)
  });
};

/**
 * Save new product.
 * @param {*} product Product.
 * @return {Promise} Product or Error.
 */
exports.save = (product) => {
  return new Promise((resolve, reject) => {

    if (!product)
      return reject('A Product object is required.');
    if (!product.name)
      return reject('A Product Name is required.');
    if (!product.price)
      return reject('A Product Price is required.');

    const prod = new Product({
      _id: new Mongoose.Types.ObjectId(),
      name: product.name,
      price: product.price,
      image: product.image || null
    });

    prod.save()
      .then(result => resolve(parse(result)))
      .catch(reject);
  });
};

/**
 * Update product data.
 * @param {*} product Product.
 * @return {Promise} true or Error.
 */
exports.update = (id, product) => {
  return new Promise((resolve, reject) => {

    if (!id) return reject('Product ID is required.');
    if (!product) return reject('Product Object is required.');
    
    const prod = { };
    if (product.name) prod.name = product.name;
    if (product.price) prod.price = product.price;

    Product.update({ _id: id }, { $set: prod })
    .exec()
    .then(result => {
      if (result.n > 0) resolve(true);
      else reject('Product not found.');
    })
    .catch(reject);
  });
};

/**
 * Remove product by id.
 * @param {*} id Product ID.
 * @return {Promise} true or Error.
 */
exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    Product.remove({ _id: id })
    .exec()
    .then(result => {
      if (result.n > 0) resolve(true);
      else reject('Product not found');
    })
    .catch(err => Response.error(response, err));
  });
};

/**
 * Clean up a product object, which was returned from database.
 * Request Object is optional and would have 'type' and 'url' fields.
 * @param {*} product Product Object.
 * @param {*} request Request Object (Optional)
 */
function parse(product, request = null) {

  if (product === null || typeof product === 'undefined')
    return null;

  const prod = {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.image
  };

  if (request !== null)
    prod.request = request;

  return prod;
}