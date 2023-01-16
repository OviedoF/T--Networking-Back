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
    console.log(cart);

    const items = cart.map((el) => {
      return {
        id: el._id,
        title: el.name,
        description: el.description,
        quantity: parseInt(el.quantity),
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
        failure: `http://tienda-api.biznes.cl/api/payments/failure/${buyer}`,
        pending: `http://tienda-api.biznes.cl/api/payments/pending/${buyer}`,
        success: `http://tienda-api.biznes.cl/api/payments/success/${buyer}`,
      },
      auto_return: "approved",
      statement_descriptor: "Networking", //Descripcion en Resumen de Tarjeta
      notificacion_url: `http://tienda-api.biznes.cl/api/payments/notifications`,
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
    console.log(Object.keys(error));
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
    const {buyer} = req.params;
    console.log(buyer)

    const userFinded = await User.findById({_id: buyer})
    
    if(!userFinded) return res.status(404).send("Usuario no encontrado.")

    const userCart = userFinded.shoppingCart;

    const newPurchase = new Purchase({
      buyer: buyer,
      cart: userCart,
      state: "Pendiente",
      paymentMethod: "Mercado Pago",
      images: userCart.map((el) => el.principalImage),
      type: "Productos",
    });

    console.log(newPurchase);
    console.log('NEW PURCHASE <------------');

    const purchaseSaved = await newPurchase.save();

    const userUpdated = await User.findByIdAndUpdate({_id: buyer}, { '$push' : { shoppingHistory : purchaseSaved._id, },
    '$set' : { shoppingCart: [] }
    }, {new: true}).populate(['roles', 'membership', 'cards'])

    res.writeHead(201, {
      Location: `${process.env.FRONTEND_URL}#/payment-success`
    }).end();
    
    
    res.status(201).send(
      userUpdated
    );
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
    const purchaseFinded = await Purchase.find().populate('buyer');
    
    res.status(200).send(purchaseFinded);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

PaymentsController.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const purchaseFinded = await Purchase
    .findById(id)
    .populate(['buyer', 'cart.product', 'cart.category', 'cart.seller'])
    
    res.status(200).send(purchaseFinded);
  } catch (error) {
    console.log(error);
    res.status
  }
}

PaymentsController.checkPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://api.mercadopago.com/v1/payments/${id}`;

    res.status(200).send({
      message: "Pedido creado exitosamente",
      params: req.params,
      body: req.body,
      headers: req.headers,
    });
  } catch (error) {
    res.status
    console.log(error);
  }
};

module.exports = PaymentsController;