const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

const marketSyncController = require('../controllers/marketSyncController');

router.get('/', marketController.getMarketPrices);
router.post('/sync', marketSyncController.syncPrices);

module.exports = router;
