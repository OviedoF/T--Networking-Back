const express = require("express");
const path = require("path");
const router = express.Router();
const qrController = require(path.join(__dirname, '..', 'controllers', 'qrUser.controller'))

router.get('/', qrController.getQr)
router.get('/user/:id', qrController.getDataQr)

router.post('/:id/createQr', qrController.createQr)

module.exports = router;
