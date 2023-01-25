const express = require('express');
const { getPets } = require('../controllers/pets');

const router = express.Router();

router.use('/pets', getPets)

module.exports = router;