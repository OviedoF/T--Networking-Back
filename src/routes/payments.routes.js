const express = require("express");
const path = require("path");
const router = express.Router();
const PaymentsController = require(path.join(__dirname, '..', 'controllers', 'payments.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.post('/', PaymentsController.getPaymentLink);

router.get('/orders', PaymentsController.getOrders)
router.get('/orders/:id', PaymentsController.getOrder)

router.post('/try/:buyer', PaymentsController.paymentSuccess);

router.get('/success/:buyer', PaymentsController.checkPayment);
 
module.exports = router;
