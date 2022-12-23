const express = require("express");
const path = require("path");
const router = express.Router();
const usersControllers = require(path.join(__dirname, '..', 'controllers', 'users.controller'))
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.get('/:id', isAdmin, usersControllers.getUsers)

module.exports = router;
