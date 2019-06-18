const Router = require('express').Router();
const controller = require('./user.controller');

Router.post('/sign-up', controller.signUp);
Router.post('/sign-in', controller.signIn);

module.exports = Router;