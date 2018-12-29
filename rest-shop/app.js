/**
 * @author		Anthony Vilarim Caliani
 * @contact     https://github.com/avcaliani
 * 
 * @Description
 * App JS File.
 */
const express = require('express');
const App = express();

App.use((request, response, next) => {
    response.status(200).json({
        message: 'It works!'
    })
});

module.exports = App;
