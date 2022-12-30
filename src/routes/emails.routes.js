const express = require("express");
const path = require("path");
const router = express.Router();
const emailsControllers = require(path.join(__dirname, '..', 'controllers', 'emails.controller'));

router.post('/registry', emailsControllers.registrySuccess);
router.post('/confirmingPurchase', emailsControllers.confirmingPurchase)
router.post('/recoverPassword', emailsControllers.recoverPassword)
router.post('/verificationRegistration', emailsControllers.verificationRegistration)

router.post('/thirtyDays', emailsControllers.thirtyDays)

module.exports = router;