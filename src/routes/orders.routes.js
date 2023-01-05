const express = require("express");
const path = require("path");
const router = express.Router();
const OrdersControllers = require(path.join(__dirname, '..', 'controllers', 'orders.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.put('/:id/orderManagement', OrdersControllers.orderManagement);

//router.delete('/:id/orderDelete', isAdmin, OrdersControllers.deleteOrder)

module.exports = router
