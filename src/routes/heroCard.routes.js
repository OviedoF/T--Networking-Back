const express = require('express');
const router = express.Router();
const path = require('path');
const { v4 } = require('uuid');
const heroCardController = require(path.join( __dirname, "..", "controllers", "heroCard.controller" ));
const {isAdmin} = require(path.join( __dirname, "..", "middlewares", "authRoles" ));

router.post('/', isAdmin, heroCardController.createHeroCard);

router.get('/', heroCardController.getHeroCard);

router.delete('/:id', heroCardController.deleteHeroCard);

module.exports = router;