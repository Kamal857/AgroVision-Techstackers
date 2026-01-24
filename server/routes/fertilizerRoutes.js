const express = require('express');
const router = express.Router();
const fertilizerController = require('../controllers/fertilizerController');

router.get('/', fertilizerController.getFertilizerStock);

module.exports = router;
