const Coupon = require('../models/coupons.model');
require('dotenv').config();

const couponController = {};

couponController.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).send(coupons);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

couponController.createCoupon = async (req, res) => {
    try {
        const {code, name, discountPercent} = req.body;

        const coupon = new Coupon({
            code,
            name,
            discountPercent
        });

        await coupon.save();

        res.status(201).json({
            message: 'Cupon creado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

couponController.editCoupon = async (req, res) => {
    try {
        const {id} = req.params;
        const {code, name, discountPercent} = req.body;

        const coupon = await Coupon
            .findByIdAndUpdate(id, {
                code,
                name,
                discountPercent
            }, {
                new: true
            });

        if(!coupon) return res.status(404).json({
            message: 'Cupon no encontrado'
        });

        res.status(200).json({
            message: 'Cupon actualizado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

couponController.deleteCoupon = async (req, res) => {
    try {
        const {id} = req.params;

        const coupon = await Coupon.findByIdAndDelete(id);

        if(!coupon) return res.status(404).json({
            message: 'Cupon no encontrado'
        });

        res.status(200).json({
            message: 'Cupon eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = couponController;