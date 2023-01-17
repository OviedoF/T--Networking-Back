const express = require("express");
const path = require("path");
const router = express.Router();
const commentsController = require(path.join( __dirname, "..", "controllers", "comments.controller.js" ));

router.get('/', commentsController.getComments);

router.get('/aproved', commentsController.getAprovedComments);

router.post('/', commentsController.createComment);

router.put('/approve/:id', commentsController.approveComment);

router.put('/reject/:id', commentsController.rejectComment);

module.exports = router;