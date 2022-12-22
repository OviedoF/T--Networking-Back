require("dotenv").config();
const path = require("path")
const axios = require
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Subscription = require(path.join( __dirname, "..", "models", "subscription.model.js" ));

const CreateSubscription = {}

CreateSubscription.getPaymentLink = async (req, res) => {
    try {
        const url = "https://api.mercadopago.com/preapproval";
        const { membership } = req.body;

        const auto_recurring = membership.map((el) => {
            return {
                name: el.name,
                description: el.description,
                price: el.price,
                days: el.days,
                priceWithOffer: el.priceWithOffer,
                principalImage: el.principalImage
            };
        });

        const body = {
            payer_email: "test_user_83219432@testuser.com",
            payer: {
                id: "test_user_49360370",
                email: "test_user_83219432@testuser.com",
                name: "Test User",
            },
            auto_recurring,
            back_urls: {
                failure: "/failure",
                pending: "/pending",
                success: "/success",
            },
            auto_return: "approved",
            statement_descriptor: "Networking", //Descripcion en Resumen de Tarjeta
            notificacion_url: `https://${process.env.ROOT_URL}/api/subscription/notifications`,
            additional_info: "MEMBRESIA",
        };

        const subscription = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
        });

        return res.status(201).send(subscription.data)

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

CreateSubscription.paymentSuccess = async (req, res) => {
    try {
        const { idbuyer, idseller } = req.headers;
        const { membership } = req.body;
        
        const products = membership.map((el) => {
            return {
                name: el.name,
                price: el.price,
                days: el.days
            }
        })
    } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}
