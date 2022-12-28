const express = require("express");
const path = require("path");
const router = express.Router();
const productsControllers = require(path.join(__dirname, '..', 'controllers', 'products.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.get('/', productsControllers.getProducts);
router.get('/category/:category', productsControllers.getProductsByCategory);
router.get('/:id', productsControllers.getProductById);

router.post('/filters', productsControllers.filterAndGetProducts);
router.post('/create', isAdmin,productsControllers.createProduct);
router.post('/:id/addImage', isAdmin,productsControllers.pushImage);

router.put('/:id/principalImage', isAdmin,productsControllers.updatePrincipalImage);
router.put('/:id/updateProduct', isAdmin, productsControllers.updateProduct);

router.delete('/:id/:filename', isAdmin, productsControllers.removeImage);
router.delete('/:id', isAdmin,productsControllers.deleteProduct);

module.exports = router;