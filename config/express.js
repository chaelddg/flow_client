"use strict";

var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser');

module.exports = function() {

    var app = express();

    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static('./public'));

    return app;

};