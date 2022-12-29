const express = require("express");
const path = require("path");
const router = express.Router();
const historyController = require(path.join(__dirname, '..', 'controllers', 'history.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.get('/user/:id', historyController.getUserHistory);
router.get('/networking/:id', isAdmin, historyController.getNetworkingHistory);

module.exports = router;