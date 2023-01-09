const {Schema, model} = require('mongoose');

const couponSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    },
    usedFor: {
        type: String,
    }
});

module.exports = model('Coupon', couponSchema);