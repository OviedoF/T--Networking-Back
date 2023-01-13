const express = require('express');
const path = require('path');
const router = express.Router();

const networkingController = require(path.resolve('src', 'controllers', 'networking.controller.js'));

router.get('/', networkingController.getNetworking);
router.put('/', networkingController.editNetworking);

module.exports = router;