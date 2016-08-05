
var mqtt = require('mqtt');
var fs = require('fs');
var tls = require('tls');

var KEY = fs.readFileSync(__dirname + '/key.pem');
var CERT = fs.readFileSync(__dirname + '/cert.pem');


var options = {
  port: 8443,
 host: 'localhost',
};

var client = mqtt.connect('mqtt://127.0.0.1:8443',  tls.connect({
   key: KEY,
   cert: CERT,
     rejectUnauthorized : false
 })
);
client.on('connect', () => console.log('conectado'));
client.subscribe('messages');
client.publish('messages', 'Current time is: ' + new Date());
client.on('message', function(topic, message) {
  console.log(message);
});
