const http = require('http');
const querystring = require('querystring');


let postData = querystring.stringify({
    'email': 'douglas.zuqueto@gmail.com',
    'password': 'admin'
});

let options = {
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    path: '/api/v1/login',
    headers: {
        'user-agent': 'tcc-broker',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    },

};
let token = null;
let req = http.request(options, (res) => {
    let body = '';

    res.setEncoding('utf8');
    res.on('data', (data) => body += data.toString());

    res.on('end', () => {
        let response = JSON.parse(body);
        token = response.token;

        /**
         * Verifica a existencia do usuário
         */

        let options = {
            hostname: 'localhost',
            port: 3000,
            method: 'GET',
            path: '/api/v1/users',
            headers: {
                'user-agent': 'tcc-broker',
                'Authorization': token
            },

        };

        http.request(options, (res) => {
            let body = '';

            res.setEncoding('utf8');
            res.on('data', (data) => body += data.toString());

            res.on('end', () => {
                let response = JSON.parse(body);
                return console.log(response);
            });
        });

    });
});

req.write(postData);
req.on('error', (err) => {
    console.log(err);
});
req.end();
