const express = require("express");
const path = require("path");
const router = express.Router();
const historyController = require(path.join(__dirname, '..', 'controllers', 'history.controller'));

router.get('/user/:id', historyController.getUserHistory);
router.get('/networking/:id', historyController.getNetworkingHistory);

module.exports = router;