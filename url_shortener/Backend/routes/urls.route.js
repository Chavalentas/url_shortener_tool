const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urls.controller.js');

router.post('/newurl', urlController.storeUrlRequest);
router.get('/:urlKey', urlController.getUrlRequest);

module.exports = router;