"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var mainRouter = require('./routes/index');
var app = express();
var PORT = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use('/', mainRouter);
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server running on ".concat(PORT));
});
