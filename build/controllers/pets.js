"use strict";
var response = require('express').response;
var pool = require('../db');
var getPets = function (request, response) {
    pool.query('SELECT * FROM pet;')
        .then(function (results) { return response.status(200).json(results.rows); })
        .catch(function (err) { return console.log(err); });
};
module.exports = { getPets: getPets };
