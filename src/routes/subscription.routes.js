const express = require("express");
const path = require("path");
const router = express.Router();
const PaymentSubscription = require(path.join(__dirname, '..', 'controllers', 'subscription.controller'));

router.post('/', PaymentSubscription.getPaymentLink);

router.post('/success', PaymentSubscription.paymentSuccess)

module.exports = router;
