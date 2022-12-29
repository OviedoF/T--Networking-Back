const express = require("express");
const path = require("path");
const router = express.Router();
const newsControllers = require(path.join(__dirname, '..', 'controllers', 'news.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

/**
 * @openapi
 * components:
 *  schemas:
 *      News:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: title news
 *              description:
 *                  type: string
 *                  description: description news
 *              image:
 *                  type: string
 *                  description: image news
 *              author:
 *                  type: string
 *                  description: author news
 *          required:
 *              - title
 *              - description
 *              - image
 *          example:
 *              title: Nueva temporada de verano
 *              description: Aprovecha todas las ofertas nuevas que tenemos para vos este verano, no te quedes sin desfrutar de nuestra calidad en ropa...
 *              image:
 *              author: Networking
 */

/**
 * @openapi
 * /api/news/:
 *  get:
 *      summary: return all news
 *      tags: [News]
 *      responses:
 *          200:
 *              description: Todas las noticias
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/News'
 */
router.get('/', newsControllers.getNews);

/**
 * @openapi
 * /api/news/:
 *  post:
 *      summary: create a news
 *      tags: [News]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/News'
 *      responses:
 *          200:
 *              description: news created,
 */

router.post('/', isAdmin, newsControllers.createNews);

/**
 * @openapi
 * /api/news/{id}:
 *  get:
 *      summary: Return a News
 *      tags: [News]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the news id  
 *      responses:
 *          200:
 *              description: Todas las noticias
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/News'
 *          404:
 *              description: news not found
 */

router.get('/:id', newsControllers.getNewsById);

/**
 * @openapi
 * /api/news/{id}:
 *  put:
 *      summary: update a news
 *      tags: [News]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the news id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/News'  
 *      responses:
 *          200:
 *              description: news update
 *          404:
 *              description: news not found
 */

router.put('/:id', isAdmin, newsControllers.updateNews);

/**
 * @openapi
 * /api/news/{id}:
 *  delete:
 *      summary: delete a news
 *      tags: [News]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the news id  
 *      responses:
 *          200:
 *              description: news delete
 *          404:
 *              description: news not found
 */

router.delete('/:id', isAdmin, newsControllers.deleteNews);

module.exports = router;