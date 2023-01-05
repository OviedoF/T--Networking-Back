const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema({
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
  email: String,
  cart: {
    type: Object
  },
  paymentMethod: String,
  images: [String],
  type: String,
  shipping: Boolean,
  trackingNumber: String,
  shippingDate: Date,
  shippingEntity: String,
  estimatedDate: Date,
}, {
    timestamps: true,
    timeseries: true
});

module.exports = model("Purchase", purchaseSchema);