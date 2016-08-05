const mqtt = require('mqtt');

let config = {
    uri: 'mqtt://localhost'
};

let options = {
    username: 'douglas.zuqueto@gmail.com',
    password: 'admin',
    id: '123456'
};

let sub = mqtt.connect(config.uri, options);

sub.on('error', (err) => console.log(err));

sub.on('connect', () => {
    console.log('Conected');
    sub.subscribe('/' + options.username + '/presence');


});
sub.publish('/' + options.username + '/presence', 'Hello mqtt');

sub.on('message', (topic, message) => {
    console.log(message.toString());
});
