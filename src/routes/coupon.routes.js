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
router.post('/', isAdmin, couponControllers.createCoupon);
router.post('/apply', couponControllers.applyCoupon);

router.put('/:id', isAdmin, couponControllers.editCoupon);
router.delete('/:id', isAdmin, couponControllers.deleteCoupon);

module.exports = router;