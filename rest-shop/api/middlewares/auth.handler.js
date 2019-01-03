/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Auth Handler.
 */
const JWT = require('jsonwebtoken');
const Response = require('../response');

module.exports = (request, response, next) => {

    try {
        request.user = JWT.verify(
            request.headers.authorization,
            process.env.JWT_KEY
        );
        next();
    } catch (err) {
        Response.error(response, 'Access denied', 401);
    }
};