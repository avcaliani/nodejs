/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Product Controller.
 */
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