const router = require('express').Router();
const Response = require('../commons/response');

router.use((request, response, next) => {
  /**
   * If any route above couldn't resolve the resquest,
   * it will be resolved by this method.
   */
  const error = new Error('Resource Not found');
  error.status = 404;
  next(error);
});

router.use((error, request, response, next) => {
  /**
   * This method will be called everytime that we have an error.
   */
  Response.error(response, error, error.status || 500)
});

module.exports = router;