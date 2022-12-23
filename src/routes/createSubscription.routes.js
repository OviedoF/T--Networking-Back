const express = require("express");
const path = require("path");
const router = express.Router();
const CreateSubscription = require(path.join(__dirname, '..', 'controllers', 'createSubscription.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.get('/', CreateSubscription.getSubscriptions)

router.post('/create', isAdmin, CreateSubscription.getCreate)

router.put('/:id/principalImage', isAdmin, CreateSubscription.updatePrincipalImage)

router.delete('/:id', isAdmin,  CreateSubscription.getDelete)

module.exports = router
