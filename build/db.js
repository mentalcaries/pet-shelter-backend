"use strict";
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'dev',
    host: 'localhost',
    database: 'shelter',
    password: '',
    port: 5432,
});
module.exports = pool;
