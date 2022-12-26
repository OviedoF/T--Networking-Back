const express = require("express");
const path = require("path");
const router = express.Router();
const usersControllers = require(path.join(__dirname, '..', 'controllers', 'users.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'));

router.get('/', isAdmin, usersControllers.getAllUsers);
router.get('/:id', isAdmin, usersControllers.getUsers);

router.put('/:id/updateUser', isAdmin, usersControllers.updateUsers);
router.put('/:id/updateUserImage', isAdmin, usersControllers.updateUserImage);

module.exports = router;
