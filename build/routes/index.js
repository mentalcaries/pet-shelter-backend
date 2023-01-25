"use strict";
var express = require('express');
var getPets = require('../controllers/pets').getPets;
var router = express.Router();
router.use('/pets', getPets);
module.exports = router;
