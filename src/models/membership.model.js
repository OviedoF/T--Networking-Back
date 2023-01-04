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

    image: {
        type: String,
        required: true
    },

    permissions: {
        perfilPhoto: Boolean,
        coverPhoto: Boolean,
        enterprisePhoto: Boolean,
        name: Boolean,
        job: Boolean,
        jobEntity: Boolean,
        description: Number,
        email: Boolean,
        saveContact: Boolean,
        vcard: Boolean,
        social: {
            favorites: {
                available: Boolean,
                exclude: Array,
                obligatory: Array,
                limit: Number
            },
            aditionals:{
                available: Boolean,     
                exclude: Array,
                obligatory: Array,
                limit: Number
            },
        },
        qr: {
            design: Boolean,
            color: Boolean,
            size: Boolean,
            logo: Boolean,
            logoSize: Boolean,
            logoPosition: Boolean,
        },
        publicity: Boolean,
        perfilType: Boolean,
        userLink: Boolean,
        design: {
            header: {
                perfilPhoto: Boolean,
                logoPhoto: Boolean,
            },
            body: {
                name: Boolean,
                job: Boolean
            }
        }
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Membership', membershipSchema)
