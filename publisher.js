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
});

setInterval(() => {
    sub.publish('/' + options.username + '/presence', 'Hello mqtt');
}, 1000);
