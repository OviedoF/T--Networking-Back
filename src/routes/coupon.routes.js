const express = require("express");
const path = require("path");
const router = express.Router();
const couponControllers = require(path.join(__dirname, '..', 'controllers', 'coupon.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'))

router.get('/', couponControllers.getCoupons);
router.post('/', isAdmin, couponControllers.createCoupon);

router.put('/:id', isAdmin, couponControllers.editCoupon);
router.delete('/:id', isAdmin, couponControllers.deleteCoupon);

module.exports = router;