const express = require('express');
const router = express.Router();
const agronomistController = require('../controllers/agronomistController');

router.post('/ask', agronomistController.askAgronomist);

module.exports = router;
