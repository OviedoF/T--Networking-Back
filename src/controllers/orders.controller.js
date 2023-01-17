require("dotenv").config();
const path = require("path");
const Purchase = require(path.join( __dirname, "..", "models", "purchase.model.js" ));
const User = require(path.join(__dirname, "..", "models", "user.model"))
const sendEmail = require(path.join(__dirname, '..', 'libs', 'emails.templates'));
const nodemailer = require('nodemailer');
const ConfirmingPurchaseEmail = require(path.join(__dirname, '..', 'emails', 'confirmingPurchaseEmail.js'));

const OrdersControllers = {};

OrdersControllers.orderManagement = async (req, res) => {
    try {

        const { state, id, trackingNumber, shippingEntity, sendDate, estimatedDate } = req.body;
    
        const orderFinded = await Purchase.findById(id);
    
        if(!orderFinded) return res.status(404).send('La orden no existe.')


        if(state === 'Trabajando') {
            await Purchase.findByIdAndUpdate
            (id, { state: 'Trabajando' });
        }

        if(state === 'Enviado') {
            const purchase = await Purchase.findByIdAndUpdate(id, {
                    state : 'Enviado',
                    trackingNumber: trackingNumber,
                    shippingEntity: shippingEntity,
                    shippingDate: sendDate,
                    estimatedDate: estimatedDate
            }, {
                new: true
            });
   
            const user = await User.findById(purchase.buyer);

            if(!user) return res.status(404).send('El usuario no existe.');

            console.log(user.email);

            const transporter = await nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: true,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
    
            const messageHtml = ConfirmingPurchaseEmail("https://res.cloudinary.com/syphhy/image/upload/v1672259034/logo_cplmck.png", "Se ha enviado su pedido!",
            `Hola ${user.username}, gracias por confiar en nosotros!`, "Con este codigo segui el paso de tu pedido!", 'https://networking.eichechile.com/', trackingNumber ,'Networking APP')
    
            await transporter.sendMail({
                from: `Networking APP <${process.env.MAIL_USERNAME}>`,
                to: user.email,
                subject: 'Networking APP - Compra exitosa!',
                html: messageHtml
            })
        }

        if(state === 'Listo para retirar') {
            await Purchase.findByIdAndUpdate(id, {
                state: 'Listo para retirar',
            })
        }

        if(state === 'Finalizado') {
            await Purchase.findByIdAndUpdate
            (id, { state: 'Finalizado' });
        }

        res.status(200).send({
            message: `Estado del pedido: ${state}.`,
            newStatus: state
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

/*OrdersControllers.deleteOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const orderFinded = await Purchase.findById(id)

        if(!orderFinded) return res.status(404).send("No se ha encontrado el pedido.");

        await Purchase.findByIdAndDelete(id);

        //Envio correo al cliente explicando la razon del cancelamiento

        res.status(200).send("Orden eliminada correctamente")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}*/

OrdersControllers.getOrdersById = async (req, res) => {
    try {
        const {id} = req.params;
        const orderFinded = await Purchase
        .find({
            buyer: id
        }).populate('buyer')

        if(!orderFinded) return res.status(404).send("No se ha encontrado pedidos.");

        res.status(200).send(orderFinded)
    } catch (error) {
        console.log(error);
        return res.status(500).send
        (error);
    }
}

module.exports = OrdersControllers
