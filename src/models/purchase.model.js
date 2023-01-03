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
  cart: {
    type: Object
  },
  images: [String],
  products: Array,
  type: String,
  shipping: Boolean,
  shippingCode: String,
  shippingDate: Date,
  shippingCost: Number,
  shippingEntity: String,
  shippingAddress: String,
  shippingCity: String,
  shippingState: String,
}, {
    timestamps: true,
    timeseries: true
});

module.exports = model("Purchase", purchaseSchema);