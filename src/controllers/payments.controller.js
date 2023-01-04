require("dotenv").config();
const path = require("path");
const axios = require("axios");
const { findByIdAndUpdate, findById } = require("../models/purchase.model");
const Networking = require(path.join(__dirname, "..", "models", "networking.model"));
const User = require(path.join(__dirname, "..", "models", "user.model"))
const Purchase = require(path.join( __dirname, "..", "models", "purchase.model.js" ));
const Product = require(path.join(__dirname, "..", "models", "product.model.js"))
const PaymentInvoice = require(path.join(__dirname, "..", "models", "paymentInvoice.model.js"))

const PaymentsController = {};

PaymentsController.getPaymentLink = async (req, res) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const { cart, buyer } = req.body;

    const newPurchase = new Purchase({
      state: "in process",
      buyer,
      cart
    })

    await newPurchase.save();

    const items = cart.map((el) => {
      return {
        id: el._id,
        title: el.name,
        description: el.description,
        quantity: el.quantity,
        unit_price: Math.ceil(el.price),
        category_id: el.category._id,
        picture_url: el.principalImage,
      };
    });

    const body = {
      payer_email: "test_user_49360370@testuser.com",
      payer: {
        id: "test_user_49360370",
        email: "test_user_49360370@testuser.com",
        name: "Test User",
      },
      
      items,
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: `https://networking-api.eichechile.com/api/payments/success/${newPurchase._id}/${buyer}`,
      },
      auto_return: "approved",
      statement_descriptor: "Networking", //Descripcion en Resumen de Tarjeta
      notificacion_url: `https://${process.env.ROOT_URL}/api/payments/notifications`,
      additional_info: "COMPRA",
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    return res.status(201).send(payment.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(Object.keys(error));
  }
};

PaymentsController.paymentSuccess = async (req, res) => {
  /* 
    - Crear nuevo documento "paymentInvoice" con la información a renderizar en el front #
    - Agregar nueva propiedad "paymentInvoice" con el documento nuevo (ref) #
    - Agregar al historial y seguimiento de comprador #
    - Mandar por email la confirmación y la factura 
    - Quitar producto del carrito del comprador #
    - Quitar cantidad de stock al producto #
  */

  try {
    const {purchase_id, buyer} = req.params;

    const userFinded = await User.findById({_id: buyer})
    const purchaseFinded = await Purchase.find({_id: purchase_id})
    
    if(!userFinded) return res.status(404).send("Usuario no encontrado.")
    if(!purchaseFinded) return res.status(404).send("Purchase no encontrado.")

    const purchaseUpdated = await Purchase.findByIdAndUpdate({_id: purchase_id}, { state: "Procesado" })
    const userUpdated = await User.findByIdAndUpdate({_id: buyer}, { $push : { shoppingHistory : purchaseFinded }})

    
    res.status(200).send({
      message: "Pedido actualizado",
      params: req.params,
      body: req.body,
      headers: req.headers,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

PaymentsController.getPaymentInvoice = async (req, res) => {
  try {
    const invoice = await PaymentInvoice.findById(req.params.id).populate(['buyer', 'seller']);
    return res.status(200).send(invoice);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

PaymentsController.getOrders = async (req, res) => {
  try {
    const purchaseFinded = await Purchase.find();
    
    res.status(200).send(purchaseFinded);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = PaymentsController;