const router = require('express').Router();
const Error = require('../commons/error');
const Response = require('../commons/response');

router.use((request, response, next) => {
  /**
   * If any route above couldn't resolve the resquest,
   * it will be resolved by this method.
   */
  next(new Error('Resource Not found', 404));
});

router.use((error, request, response, next) => {
  /**
   * This method will be called everytime that we have an error.
   */
  Response.error(response, error)
});

module.exports = router;