const mqtt = require('mqtt');

let config = {
    uri: 'mqtt://localhost'
};

let options = {
    username: 'douglas.zuqueto@gmail.com',
    password: 'admin',
    id: '123456'
};

// let sub = mqtt.connect(config.uri, options);
let sub = mqtt.connect(config.uri);

sub.on('error', (err) => console.log(err));

sub.on('connect', () => {
    console.log('conect');
    sub.subscribe('/' + options.username + '/presence');

    // sub.subscribe('/presence');
    // sub.publish('/presence', 'Hello mqtt');
});
sub.publish('/' + options.username + '/presence', 'Hello mqtt');


sub.on('message', (topic, message) => {
    console.log(message.toString());
});
