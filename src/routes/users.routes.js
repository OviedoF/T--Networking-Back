const express = require("express");
const path = require("path");
const router = express.Router();
const usersControllers = require(path.join(__dirname, '..', 'controllers', 'users.controller'))

router.get('/', usersControllers.getUsers)

module.exports = router;
