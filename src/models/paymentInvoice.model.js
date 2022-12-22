const {Schema, model} = require('mongoose');

const paymentInvoiceSchema = new Schema({
    state: {
        type: String,
        required: true,
    },
    invoice: {
        ref: "PaymentInvoice",
        type: Schema.Types.ObjectId
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Networking",
        required: true,
    },
    images: [String],
    products: Array,
    type: String
}, {
    timestamps: true,
    timeseries: true
});

module.exports = model('PaymentInvoice', paymentInvoiceSchema);