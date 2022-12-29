const express = require("express");
const path = require("path");
const router = express.Router();
const productsControllers = require(path.join(__dirname, '..', 'controllers', 'products.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

/**
 * @openapi
 * components:
 *  schemas:
 *      Products:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: name product
 *              description:
 *                  type: string
 *                  description: description product
 *              category:
 *                  type: string
 *                  description: category product
 *              subcategory:
 *                  type: array
 *                  items:
 *                      type: string
 *              stock:
 *                  type: number
 *                  description: stock product
 *              price:
 *                  type: number
 *                  description: price product
 *              priceWithOffer:
 *                  type: number
 *                  description: price offer product
 *              principalImage:
 *                  type: string
 *                  description: image product
 *              galeryImages:
 *                  type: array
 *                  items:
 *                      type: string
 *              comments:
 *                  type: array
 *                  items:
 *                      type: string
 *          required:
 *              - name
 *              - description
 *              - price
 *              - principalImage
 *          example:
 *              name: notebook
 *              description: notebook 16' 8gb ram 128gb ssd
 *              category: tecnology
 *              subcategories: [pc, notebooks]
 *              stock: 51
 *              price: 152
 *              priceWithOffer: 140
 *              principalImage:
 *              galeryImages: []
 */

/**
 * @openapi
 * /api/product/:
 *  get:
 *      summary: return all products
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Todos los productos
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Products'
 */

router.get('/', productsControllers.getProducts);

/**
 * @openapi
 * /api/product/category/{category}:
 *  get:
 *      summary: return a product
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the category id  
 *      responses:
 *          200:
 *              description: Producto por categoria
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Products'
 *          404:
 *              description: category not found
 */
router.get('/category/:category', productsControllers.getProductsByCategory);
router.get('/:id', productsControllers.getProductById);

router.post('/filters', productsControllers.filterAndGetProducts);
router.post('/create', isAdmin, productsControllers.createProduct);
router.post('/:id/addImage', isAdmin, productsControllers.pushImage);

router.put('/:id/principalImage', isAdmin, productsControllers.updatePrincipalImage);
router.put('/:id/updateProduct', isAdmin, productsControllers.updateProduct);

router.delete('/:id/:filename', isAdmin, productsControllers.removeImage);
router.delete('/:id', isAdmin, productsControllers.deleteProduct);

module.exports = router;