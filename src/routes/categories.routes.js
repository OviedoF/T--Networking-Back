const express = require("express");
const path = require("path");
const router = express.Router();
const categoriesControllers = require(path.join(__dirname, '..', 'controllers', 'categories.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

/**
 * @openapi
 * components:
 *  schemas:
 *      Categories:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: name category
 *              imageUrl:
 *                  type: string
 *                  description: image category
 *              subCategories:
 *                  type: array
 *                  items: 
 *                      type: string
 *          required:
 *              - name
 *              - imageUrl
 *          example:
 *              name: Ropa
 *              imageUrl: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEdze--JNfbdFgkuubsPySdtDzbdKgQ9Ig5Q&usqp=CAU
 *              subCategories: [Ropa interior, Ropa de verano]
 */

/**
 * @openapi
 * /api/categories/:
 *  get:
 *      summary: return all categories
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: Todas las categorias
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Categories'
 */
router.get('/', categoriesControllers.getCategories);

/**
 * @openapi
 * /api/categories/{id}:
 *  get:
 *      summary: return a category
 *      tags: [Categories]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the category id  
 *      responses:
 *          200:
 *              description: Categoria por id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Categories'
 *          404:
 *              description: category not found
 */
router.get('/:id', categoriesControllers.getCategoryById);

router.post('/', isAdmin, categoriesControllers.createCategory);

router.put('/update/:id', isAdmin, categoriesControllers.updateCategory);

router.delete('/delete/:id', isAdmin, categoriesControllers.deleteCategory);

module.exports = router;