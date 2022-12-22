const express = require("express");
const path = require("path");
const router = express.Router();
const CreateSubscription = require(path.join(__dirname, '..', 'controllers', 'createSubscription.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.post('/create', isAdmin, CreateSubscription.getCreate)

module.exports = router
