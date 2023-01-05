require("dotenv").config();
const path = require("path");
const Purchase = require(path.join( __dirname, "..", "models", "purchase.model.js" ));
const User = require(path.join(__dirname, "..", "models", "user.model"))
const sendEmail = require(path.join(__dirname, '..', 'libs', 'emails.templates'));

const OrdersControllers = {};

OrdersControllers.orderManagement = async (req, res) => {
    try {

        const { state, id } = req.body;
    
        const orderFinded = await Purchase.findById(id);
    
        if(!orderFinded) return res.status(404).send('La orden no existe.')
        
        const orderFind = await Purchase.findByIdAndUpdate(id, {state: state})

        /*
        if(state === "Enviado") {
    
            //Envio de email con codigo de seguimiento y notificacion de envio.
            const messageHtml = ``
    
            await sendEmail(messageHtml, userFinded.email, 'Producto enviado')
    
        }
        if(state === "Listo para retirar") {
    
            //Envio de email notificando que ya se puede retirar el pedido
            const messageHtml = ``
    
            await sendEmail(messageHtml, userFinded.email, 'Ya puede retirar su producto')
    
        }
        if(state === "Finalizado") {
    
            //Envio de email para agradecimiento
            const messageHtml = ``
    
            await sendEmail(messageHtml, userFinded.email, 'Gracias por su compra')
    
        }*/
    
        res.status(200).send(`Estado del pedido: ${state}.`)
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

module.exports = OrdersControllers
