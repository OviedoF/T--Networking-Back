const express = require("express");
const path = require("path");
const router = express.Router();
const newsControllers = require(path.join(__dirname, '..', 'controllers', 'news.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.get('/', newsControllers.getNews);
router.post('/', isAdmin, newsControllers.createNews);

router.get('/:id', newsControllers.getNewsById);

router.put('/:id', isAdmin, newsControllers.updateNews);
router.delete('/:id', isAdmin, newsControllers.deleteNews);

module.exports = router;