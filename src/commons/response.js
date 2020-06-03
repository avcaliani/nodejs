exports.ok = (response, data, code = 200) => {
  /**
   * You can even 'return' the response statement, but it is optional.
   * For example:
   *  return response.status(200).json({ ... });
   */
  response.status(data === null ? 404 : code).json({
    data: data,
    message: data === null ? 'Data not found.' : null
  });
}

exports.error = (response, err, code = 500) => {
  console.error('ERROR!', err);
  response.status(err.httpStatus || code).json({
    data: null,
    message: err.message || err
  });
}