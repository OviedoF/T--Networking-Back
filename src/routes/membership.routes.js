const express = require("express");
const path = require("path");
const router = express.Router();
const MembershipController = require(path.join(__dirname, '..', 'controllers', 'membership.controller'));
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

router.post('/create', isAdmin, MembershipController.createSubscription)

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

router.get('/', MembershipController.getSubscriptions)

router.put('/:id/principalImage', isAdmin, MembershipController.updatePrincipalImage)

router.delete('/:id', isAdmin,MembershipController.deleteSubscription)

module.exports = router
