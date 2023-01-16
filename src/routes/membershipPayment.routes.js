const express = require("express");
const path = require("path");
const router = express.Router();
const MembershipPaymentController = require(path.join(__dirname, '..', 'controllers', 'membershipPayment.controller'));

router.post('/', MembershipPaymentController.getPaymentLink);

router.post('/success/:buyer/:membership/:period', MembershipPaymentController.paymentSuccess)

router.get('/success/:buyer/:membership/:period', MembershipPaymentController.paymentSuccess);

module.exports = router;