const { Schema, model} = require("mongoose");

const membershipSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    days: {
        type: Number,
        required: true
    },

    priceWithOffer: {
        type: Number
    },

    principalImage: {
        type: String,
        required: true
    }
})

module.exports = model('Membership', membershipSchema)
