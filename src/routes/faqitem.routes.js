const express = require("express");
const path = require("path");
const router = express.Router();
const faqitemController = require(path.join( __dirname, "..", "controllers", "faqitem.controller" ));
const {isAdmin} = require(path.join( __dirname, "..", "middlewares", "authRoles" ));

router.get('/', faqitemController.getFaqItems);

router.post('/', isAdmin, faqitemController.createFaqItem);

router.delete('/:id', isAdmin, faqitemController.deleteFaqItem);

module.exports = router;
