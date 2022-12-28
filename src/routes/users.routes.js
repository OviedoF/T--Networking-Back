const express = require("express");
const path = require("path");
const router = express.Router();
const usersControllers = require(path.join(__dirname, '..', 'controllers', 'users.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'));

router.get('/', isAdmin, usersControllers.getAllUsers);
router.get('/admin', isAdmin, usersControllers.getAdminUser);
router.get('/:id', usersControllers.getUserById)


router.put('/:id/updateUser', isAdmin, usersControllers.updateUserAdmin);
router.put('/:id/updateUserImage', isAdmin, usersControllers.updateUserAdminImage);

module.exports = router;
