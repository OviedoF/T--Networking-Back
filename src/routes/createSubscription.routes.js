const express = require("express");
const path = require("path");
const router = express.Router();
const CreateSubscription = require(path.join(__dirname, '..', 'controllers', 'createSubscription.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

/**
 * @openapi
 * components:
 *  schemas:
 *      Subscription:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: subscription name 
 *              description:
 *                  type: string
 *                  description: subscription description
 *              price:
 *                  type: number
 *                  description: subscription price
 *              days:
 *                  type: number
 *                  description: subscription days
 *              priceWithOffer:
 *                  type: number
 *                  description: subscription offer price
 *              principalImage:
 *                  type: string
 *                  description: subscription image
 *              subscriptions:
 *                  type: number
 *                  description: subscriptions
 *          
 *          required:
 *              - name
 *              - description
 *              - price
 *              - days
 *              - principalImage
 *          
 *          example:
 *              name: subscription silver
 *              description: esta suscripcion es de prueba
 *              price: 500
 *              days: 30
 *              priceWithOffer: 450
 *              principalImage:    
 *              subscriptions: 0
 */

/**
 * @openapi
 * /api/createSubscription/create:
 *  post:
 *      summary: create a new subscription
 *      tags: [Subscription]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Subscription'
 *      responses:
 *          200:
 *              description: new subscription created,
 */

router.post('/create', isAdmin, CreateSubscription.createSubscription)

/**
 *  @openapi
 *  /api/createSubscription/: 
 *      get:
 *          summary: return all subscriptions
 *          tags: [Subscription]
 *          responses:
 *              200:
 *                  description: Todas las suscripciones
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Subscription'
 */

router.get('/', CreateSubscription.getSubscriptions)

/**
 * @openapi
 * /api/createSubscription/{id}/principalImage:
 *  put:
 *      summary: update a subscription
 *      tags: [Subscription]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the subscription id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Subscription'  
 *      responses:
 *          200:
 *              description: subscription update
 *          404:
 *              description: subscription not found
 */

router.put('/:id/principalImage', isAdmin, CreateSubscription.updatePrincipalImage)

/**
 * @openapi
 * /api/createSubscription/{id}:
 *  delete:
 *      summary: delete a subscription
 *      tags: [Subscription]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the subscription id  
 *      responses:
 *          200:
 *              description: subscription delete
 *          404:
 *              description: subscription not found
 */

router.delete('/:id', isAdmin,CreateSubscription.deleteSubscription)

module.exports = router
