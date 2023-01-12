const express = require("express");
const path = require("path");
const router = express.Router();
const cardController = require(path.join( __dirname, "..", "controllers", "card.controller" ));
const { validatePassword, checkDuplicate } = require(path.join( __dirname, "..", "middlewares", "verifySignUp" ));

router.post('/', cardController.createCard);
router.get('/:cardLink', cardController.findCard);

router.put('/:cardid', cardController.updateCard);

module.exports = router;