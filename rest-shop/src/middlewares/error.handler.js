const Response = require('../commons/response');

module.exports = function(error, request, response, next) {
  /**
   * This method will be called everytime that we have an error.
   */
  Response.error(response, error);
};