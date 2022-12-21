const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
        required: true
    },
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