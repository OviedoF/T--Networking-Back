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
    permissions: [Object]

    // permissions: {
    //     perfilPhoto: Boolean,
    //     coverPhoto: Boolean,
    //     enterprisePhoto: Boolean,
    //     name: Boolean,
    //     job: Boolean,
    //     jobEntity: Boolean,
    //     description: {
    //         available: Boolean,
    //         limit: Number
    //     },
    //     email: Boolean,
    //     saveContact: Boolean,
    //     vcard: Boolean,
    //     social: {
    //         favorites: {
    //             available: Boolean,
    //             exclude: Array,
    //             obligatory: Array,
    //             limit: Number
    //         },
    //         aditionals:{
    //             available: Boolean,     
    //             exclude: Array,
    //             obligatory: Array,
    //             limit: Number
    //         },
    //     },
    //     qr: {
    //         design: Boolean,
    //         color: Boolean,
    //         logo: Boolean,
    //     },
    //     publicity: Boolean,
    //     perfilType: Boolean,
    //     userLink: Boolean,
    //     design: {
    //         available: Boolean,
    //         header: {
    //             perfilPhoto: {
    //                 available: Boolean,
    //                 borderRadius: Boolean,
    //                 borderColor: Boolean,
    //                 borderWidth: Boolean,
    //             },
    //             logoPhoto: {
    //                 available: Boolean,
    //                 borderRadius: Boolean,
    //                 borderColor: Boolean,
    //                 borderWidth: Boolean,
    //             }
    //         },
    //         info: {
    //             name: {
    //                 available: Boolean,
    //                 fontSize: Boolean,
    //                 color: Boolean,
    //                 letterSpacing: Boolean,
    //                 wordSpacing: Boolean,
    //                 textAlign: Boolean,
    //             },
    //             job: {
    //                 available: Boolean,
    //                 fontSize: Boolean,
    //                 color: Boolean,
    //                 letterSpacing: Boolean,
    //                 wordSpacing: Boolean,
    //                 textAlign: Boolean,
    //             },
    //             email: {
    //                 available: Boolean,
    //                 fontSize: Boolean,
    //                 color: Boolean,
    //                 letterSpacing: Boolean,
    //                 textAlign: Boolean,
    //             },
    //             biography: {
    //                 fontSize: Boolean,
    //                 color: Boolean,
    //                 letterSpacing: Boolean,
    //                 lineHeight: Boolean,
    //                 wordSpacing: Boolean,
    //                 textAlign: Boolean,
    //             }
    //         },
    //         buttons: {
    //             vcard: {
    //                 available: Boolean,
    //                 fontSize: Boolean,
    //                 color: Boolean,
    //                 letterSpacing: Boolean,
    //                 backgroundColor: Boolean,
    //                 borderRadius: Boolean,
    //                 width: Boolean,
    //                 height: Boolean,
    //             },
    //             saveContact: {
    //                 available: Boolean,
    //                 fontSize: Boolean,
    //                 color: Boolean,
    //                 letterSpacing: Boolean,
    //                 backgroundColor: Boolean,
    //                 borderRadius: Boolean,
    //                 width: Boolean,
    //                 height: Boolean,
    //             },
    //         },
    //         social: {
    //             favorites: {
    //                 available: Boolean,
    //                 color: Boolean,
    //                 backgroundColor: Boolean,
    //                 borderRadius: Boolean,
    //             },
    //             aditionals: {
    //                 available: Boolean,
    //                 color: Boolean,
    //                 backgroundColor: Boolean,
    //                 borderRadius: Boolean,
    //             },
    //         },
    //     }
    // }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Membership', membershipSchema)
