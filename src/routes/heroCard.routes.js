const express = require('express');
const router = express.Router();
const path = require('path');
const { v4 } = require('uuid');
const heroCardController = require(path.join( __dirname, "..", "controllers", "heroCard.controller" ));

router.post('/creae', heroCardController.createHeroCard);

router.get('/get', heroCardController.getHeroCard);

router.delete('/delete/:id', heroCardController.deleteHeroCard);

module.exports = router;