var mosca = require('mosca')

var SECURE_KEY = __dirname + '/key.pem';
var SECURE_CERT = __dirname + '/cert.pem';

var settings = {
  host: '127.0.0.1',
  port: 8443,
  logger: {
    name: "secureExample",
    level: 40,
  },
  secure : {
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
  }
};
var server = new mosca.Server(settings);
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca secure server is up and running')
}
