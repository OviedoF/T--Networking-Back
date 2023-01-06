const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Sin nombre"
    },
    description: {
        type: String,
        required: true,
        default: "Sin descripción"
    },
    category: {
        ref: 'Category',
        type: Schema.Types.ObjectId
    },
    subcategories: [{
        ref: 'SubCategory',
        type: Schema.Types.ObjectId
    }],
    stock: Number,
    price: {
        type: Number,
        required: true,
        default: 0
    },
    requiredQR: {
        type: Boolean,
        required: true,
        default: false
    },
    colors: [{
        name: String,
        hex: String
    }],
    priceWithOffer: {
        type: Number
    },
    principalImage: {
        type: String,
        required: true
    },
    galeryImages: Array,
    comments: [{
        ref: "Comment",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Product', productSchema);