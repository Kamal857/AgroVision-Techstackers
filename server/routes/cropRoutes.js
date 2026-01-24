const express = require('express');
const router = express.Router();
const multer = require('multer');
const cropController = require('../controllers/cropController');

// Multer Setup
const upload = multer({ dest: 'uploads/' });

router.post('/detect', upload.single('image'), cropController.detectCrop);

module.exports = router;
