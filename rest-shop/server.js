/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Server JS File.
 */

const HTTP = require('http');
const App = require('./app')

HTTP.createServer(App)
  .listen(process.env.PORT || 3000);
  