"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express'),
    path = require('path'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    Primus = require('primus.io');

var proxy = httpProxy.createProxyServer(),
    app = express();

var server = http.createServer(app);
var primus = new Primus(server, { transformer: 'websockets', parser: 'JSON' });

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;

var publicPath = path.resolve(__dirname, 'public');

var ip_add = "localhost";

if (!isProduction) {

    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/build/*', function(req, res) {
        proxy.web(req, res, {
            target: 'http://'+ ip_add +':8080/'
        });
    });

}

primus.on('connection', function (spark) {

    spark.on('chat_send', function(data) {
        console.log('chat_send inside');
        primus.send('chat_socket', 'chat_message');

    });

});

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again ... ');
});


server.listen(port, function() {
    console.log('server running on port ' + port);
});
