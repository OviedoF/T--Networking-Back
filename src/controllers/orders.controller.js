require("dotenv").config();
const path = require("path");
const Purchase = require(path.join( __dirname, "..", "models", "purchase.model.js" ));
const User = require(path.join(__dirname, "..", "models", "user.model"))
const sendEmail = require(path.join(__dirname, '..', 'libs', 'emails.templates'));

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
            await Purchase.findByIdAndUpdate(id, {
                    state : 'Enviado',
                    trackingNumber: trackingNumber,
                    shippingEntity: shippingEntity,
                    shippingDate: sendDate,
                    estimatedDate: estimatedDate
            });
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

module.exports = OrdersControllers
