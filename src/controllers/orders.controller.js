require("dotenv").config();
const path = require("path");
const Purchase = require(path.join( __dirname, "..", "models", "purchase.model.js" ));
const User = require(path.join(__dirname, "..", "models", "user.model"))

const OrdersControllers = {};

OrdersControllers.orderManagement = async (req, res) => {
    const {id} = req.params;
    const orderFinded = await Purchase.findById(id, {state: true});

    if(!orderFinded) return res.status(404).send('La orden no existe.')

    if(orderFinded.state === "In process") {
        const orderFind = await Purchase.findByIdAndUpdate(id, {state: "Preparing order"})

        res.status(200).send('Pedido en preparacion')
    }
    if(orderFinded.state === "Preparing order") {
        const orderFind = await Purchase.findByIdAndUpdate(id, {state: "Sent"})

        //Envio de email con codigo de seguimiento y notificacion de envio.

        res.status(200).send('Pedido enviado.')
    }
    if(orderFinded.state === "Sent") {
        const orderFind = await Purchase.findByIdAndUpdate(id, {state: "Delivered"})

        res.status(200).send('Pedido entregado')
    }
}

OrdersControllers.deleteOrder = async (req, res) => {
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
}

module.exports = OrdersControllers
