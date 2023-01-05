const express = require("express");
const path = require("path");
const router = express.Router();
const PaymentsController = require(path.join(__dirname, '..', 'controllers', 'payments.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.post('/', PaymentsController.getPaymentLink);
router.post('/success/:buyer', PaymentsController.paymentSuccess);

router.get('/invoice/:id', PaymentsController.getPaymentInvoice);
router.get('/orders', PaymentsController.getOrders)

module.exports = router;
