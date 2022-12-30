const express = require("express");
const path = require("path");
const router = express.Router();
const historyController = require(path.join(__dirname, '..', 'controllers', 'history.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

/**
 * @openapi
 * components:
 *  schemas:
 *      History:
 *          type: object
 *          properties:
 *              state:
 *                  type: string
 *                  description: state order
 *              invoice:
 *                  type: string
 *                  description: payment invoice
 *              buyer:
 *                  type: string
 *                  description: buyer product
 *              seller:
 *                  type: string
 *                  description: seller product
 *              images:
 *                  type: array
 *                  items:
 *                      type: string
 *              products:
 *                  type: array
 *              type:
 *                  type: string
 *              shipping:
 *                  type: boolean
 *              shippingCode:
 *                  type: string
 *              shippingDate:
 *                  type: date
 *              shippingCost:
 *                  type: number
 *              shippingEntity:
 *                  type: string
 *              shippingAddress:
 *                  type: string
 *              shippingCity:
 *                  type: string
 *              shippingState:
 *                  type: string
 *          required:
 *              - state
 *              - buyer
 *              - seller
 *          example:
 *              state: Producto enviado
 *              invoice:
 *              buyer: Pedro Garcia
 *              seller: Networking
 */

/**
 * @openapi
 * /api/history/user/{id}:
 *  get:
 *      summary: return a history
 *      tags: [History]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the user id  
 *      responses:
 *          200:
 *              description: Historial por id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/History'
 *          404:
 *              description: user not found
 */

router.get('/user/:id', historyController.getUserHistory);

/**
 * @openapi
 * /api/history/networking/{id}:
 *  get:
 *      summary: return a history
 *      tags: [History]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the user admin id  
 *      responses:
 *          200:
 *              description: Historial admin por id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/History'
 *          404:
 *              description: user not found
 */

router.get('/networking/:id', isAdmin, historyController.getNetworkingHistory);

module.exports = router;
