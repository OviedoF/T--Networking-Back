require("dotenv").config();
const path = require("path")
const axios = require('axios');
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Subscription = require(path.join( __dirname, "..", "models", "membership.model.js" ));
const {v4} = require('uuid');
const moment = require('moment');

const MembershipPayment = {}

MembershipPayment.getPaymentLink = async (req, res) => {
    try {
        const url = "https://api.mercadopago.com/preapproval";
        const { cart, userid, membership, period } = req.body;
        let date = moment().add(5, 'minutes').toISOString();
        console.log(cart);

        const body = {
            auto_recurring: {
                start_date: date,
                frequency: 1,
                frequency_type: period === 'month' ? "months" : "years",
                transaction_amount: cart.priceWithOffer ? parseInt(cart.priceWithOffer) : parseInt(cart.price),
                currency_id: "CLP"
            },
            back_url: `http://tienda-api.biznes.cl/api/membershipPayment/success/${userid}/${cart._id}/${period}`,
            payer_email: "test_user_49360370@testuser.com",
            reason: `${cart.description.toUpperCase()} POR ${cart.period === "month" ? "1 MES" : "1 AÑO"}`,
            notificacion_url: `http://tienda-api.biznes.cl/api/membershipPayment/notification/${userid}/${cart._id}`,
            external_reference: userid,
        };

        const subscription = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
        });

        console.log(subscription.data)

        return res.status(201).send(subscription.data)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

MembershipPayment.paymentSuccess = async (req, res) => {
    try {
        const { buyer: idbuyer, membership, period } = req.params;

        const membershipFinded = await Subscription.find({ _id: membership });
        const user = await User.findById(idbuyer)

        console.log(membershipFinded[0].discount);

        if (!user) {
            return res.status(404).send('El usuario no existe');
        };

        if (!membershipFinded) {
            return res.status(404).send('La membresia no existe');
        };

        await User.findByIdAndUpdate(idbuyer, {
            membership: [membershipFinded[0]._id],
            daysMembership: period === "month" ? 30 : 365,
            membershipDiscount: membershipFinded[0].discount,
        });
        
        res.writeHead(201, {
            Location: `${process.env.FRONTEND_URL}#/payment-success`
        }).end();
    } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

MembershipPayment.checkPayment = async (req, res) => {
    try {
        const { idbuyer } = req.headers;

        const user = await User.findById(idbuyer);

        if (!user) {
            return res.status(404).send('El usuario no existe');
        };

        res.status(200).send({
            headers: req.headers,
            body: req.body,
            user: user,
            params: req.params
        })
    } catch (error) {
    res.status
    (500).
    send(error
    );
    console.log(error);
    }
}

/*MembershipPayment.expirationMembership = async (req, res) => {
    try {

    } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}*/

module.exports = MembershipPayment;
