const express = require("express");
const path = require("path");
const router = express.Router();
const CreateSubscription = require(path.join(__dirname, '..', 'controllers', 'createSubscription.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

/**
 * @swagger
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
 *              principalImage: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAG1BMVEXMzMyWlpbFxcWxsbG3t7ecnJyjo6O+vr6qqqqUhI1cAAABC0lEQVR4nO3U7YrDIBCFYccZP+7/itfRmES6+VfDLrwPlEo54HGSGgIAAAAAAAAAAAAAAAAAAAD+NWkflUZ9kZI9hc7UU+ibqu9Ys6qWEExUJT6EZuop9EXWzt++8nH63GZRfWrBN45i99BMXaFtYrFeq4zT+xAs9WWqbTpLaKZuoY3FfEfJItXXbccydjQxKUvoSN1Du2tpLEnHelRos/Gia62eWkJ7a7n2XJZBqNhnqKVenJYrsr42KeVfarXUa+9Wf6M1H3+y8ew0lWtcvdZM3UJ7a4WUrT+zfiWV8bOFmpbQTF2h3bVKlnFxnxe4V4rnuEatmXrjlgcAAAAAAAAAAAAAAAAAAH/cD4mjA82Or0YGAAAAAElFTkSuQmCC    
 *              subscriptions: 0
 */

/**
 *  @swagger
 *  /: 
 *      get:
 *          summary: all subscriptions
 *          tags: [Subscription]
 *
 *      responses:
 *          200:
 *              description: Todos los usuarios
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Subscription'
 *          500:
 *              description: Peticion no realizada.
 */

router.get('/', CreateSubscription.getSubscriptions)

/**
 *  @openapi
 *  /api/createSubscription/create: 
 *      post:
 *          summary: create a new subscription
 *          tags: [Subscription]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Subscription'
 *      responses:
 *          201:
 *              description: Membresia creada correctamente!
 *          500:
 *              description: Membresia no creada.
 */

router.post('/create', CreateSubscription.createSubscription)

router.put('/:id/principalImage', isAdmin, CreateSubscription.updatePrincipalImage)

/**
 *  @swagger
 *  /{id}: 
 *      delete:
 *          summary: all subscriptions
 *          tags: [Subscription]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Id de suscripcion
 *      responses:
 *          200:
 *              description: Eliminar usuario
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Subscription'
 *          500:
 *              description: Peticion no realizada.
 */

router.delete('/:id', isAdmin,  CreateSubscription.deleteSubscription)

module.exports = router
