const express = require("express");
const path = require("path");
const router = express.Router();
const couponControllers = require(path.join(__dirname, '..', 'controllers', 'coupon.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

/**
 * @openapi
 * components:
 *  schemas:
 *      Coupons:
 *          type: object
 *          properties:
 *              code:
 *                  type: string
 *                  description: code coupon
 *              name:
 *                  type: string
 *                  description: name coupon
 *              discountPercent:
 *                  type: number
 *                  description: discount coupon
 *          required:
 *              - code
 *              - name
 *              - discountPercent
 *          example:
 *              name: ejemplo
 *              description: descuento navidad
 *              discountPercent: 20
 */

/**
 * @openapi
 * /api/coupon/:
 *  get:
 *      summary: return all coupons    
 *      tags: [Coupons]
 *      responses:
 *          200:
 *              description: Todos los cupones
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Coupons'
 */

router.get('/', couponControllers.getCoupons);

/**
 * @openapi
 * /api/coupon/:
 *  post:
 *      summary: create a new coupon
 *      tags: [Coupons]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Coupons'
 *      responses:
 *          200:
 *              description: new coupon created,
 */
router.post('/', isAdmin, couponControllers.createCoupon);
router.post('/apply', couponControllers.applyCoupon);

/**
 * @openapi
 * /api/coupon/{id}:
 *  put:
 *      summary: update a coupon
 *      tags: [Coupons]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the coupon id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Coupons'  
 *      responses:
 *          200:
 *              description: coupons update
 *          404:
 *              description: coupons not found
 */

router.put('/:id', isAdmin, couponControllers.editCoupon);

/**
 * @openapi
 * /api/coupon/{id}:
 *  delete:
 *      summary: delete a category
 *      tags: [Coupons]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the coupon id  
 *      responses:
 *          200:
 *              description: coupon delete
 *          404:
 *              description: coupon not found
 */

router.delete('/:id', isAdmin, couponControllers.deleteCoupon);

module.exports = router;