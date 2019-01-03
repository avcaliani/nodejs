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

    const token = request.headers.authorization;
    if (token && !token.startsWith('Bearer '))
        Response.error(response, 'Access denied', 401);

    try {
        request.user = JWT.verify(
            token.replace('Bearer ', '').trim(),
            process.env.JWT_KEY
        );
        next();
    } catch (err) {
        Response.error(response, 'Access denied', 401);
    }
};