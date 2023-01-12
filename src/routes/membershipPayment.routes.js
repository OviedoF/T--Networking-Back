const express = require("express");
const path = require("path");
const router = express.Router();
const MembershipPaymentController = require(path.join(__dirname, '..', 'controllers', 'membershipPayment.controller'));

router.post('/', MembershipPaymentController.getPaymentLink);

router.post('/success', MembershipPaymentController.paymentSuccess)

router.get('/success/:userid', MembershipPaymentController.checkPayment)
router.post('/success/:userid', MembershipPaymentController.checkPayment)
router.put('/success/:userid', MembershipPaymentController.checkPayment)
router.delete('/success/:userid', MembershipPaymentController.checkPayment)

module.exports = router;