const express = require("express");
const path = require("path");
const router = express.Router();
const PaymentsController = require(path.join(__dirname, '..', 'controllers', 'payments.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.post('/', PaymentsController.getPaymentLink);
// router.post('/success/:buyer', PaymentsController.paymentSuccess);

router.get('/invoice/:id', PaymentsController.getPaymentInvoice);
router.get('/orders', PaymentsController.getOrders)

router.get('/success/:id', PaymentsController.checkPayment)
router.post('/success/:id', PaymentsController.checkPayment)
router.put('/success/:id', PaymentsController.checkPayment)
router.delete('/success/:id', PaymentsController.checkPayment)

router.get('/pending/:id', PaymentsController.checkPayment)
router.post('/pending/:id', PaymentsController.checkPayment)
router.put('/pending/:id', PaymentsController.checkPayment)
router.delete('/pending/:id', PaymentsController.checkPayment)

router.get('/failure/:id', PaymentsController.checkPayment)
router.post('/failure/:id', PaymentsController.checkPayment)
router.put('/failure/:id', PaymentsController.checkPayment)
router.delete('/failure/:id', PaymentsController.checkPayment)

module.exports = router;
