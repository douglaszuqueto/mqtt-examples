const mosca = require('mosca');
require('./config/db');
const config = require('./config/config');
const auth = require('./services/auth');

const authenticate = (client, username, password, callback) => {

    // User.findOne({email: username, password: password}, (err, user) => {
    //
    //     let authorized = false;
    //
    //     if (user) {
    //         client.user = user.email;
    //         authorized = true;
    //     }
    //
    //     callback(null, authorized);
    //
    // });

};

const authorizePublish = (client, topic, payload, callback) => {
    callback(null, client.user == topic.split('/')[1]);
};

const authorizeSubscribe = (client, topic, callback) => {
    callback(null, client.user == topic.split('/')[1]);
};


let ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: config.mongodb.uri,
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

let settings = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
        factory: mosca.persistence.Mongo,
        url: config.mongodb.uri
    }
};
const server = new mosca.Server(settings);
server.on('ready', setup);

function setup() {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
};
