const express = require("express");
const path = require("path");
const router = express.Router();
const emailsControllers = require(path.join(__dirname, '..', 'controllers', 'emails.controller'));

router.get('/registry', emailsControllers.registrySuccess);

module.exports = router;