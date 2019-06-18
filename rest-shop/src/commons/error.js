class Error {

  constructor(msg = null, httpStatus = null) {
    this._message = msg;
    this._httpStatus = httpStatus || 500;
  }

  // Error Message
  set message(msg) { this._message = msg; }
  get message() { return this._message; }

  // HTTP Status Code
  set httpStatus(httpStatus) { this._httpStatus = httpStatus; }
  get httpStatus() { return this._httpStatus; }
};

module.exports = Error;