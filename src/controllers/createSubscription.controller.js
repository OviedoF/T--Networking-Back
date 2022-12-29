const path = require('path')
const Subscription = require(path.join(__dirname, '..', 'models', 'subscription.model'))
const deleteImage = require(path.join(__dirname, '..', 'libs', 'dirLibrary'));
require("dotenv").config();

const CreateSubscription = {};

CreateSubscription.createSubscription = async (req, res) => {
    try {
        const { filename } = req.files[0];

            const newSubscription = new Subscription({
                ...req.body,
                principalImage: `${process.env.ROOT_URL}/images/${filename}`
            })
            const savedSubscription = await newSubscription.save();
        

        res.status(201).send({
            message: 'Membresia creada correctamente!',
            subscriptionData: {
                name: req.body.name,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

CreateSubscription.updatePrincipalImage = async (req, res) => {
    try {
        const {id} = req.params;
        const subscriptionFinded = await Subscription.findById(id)
        const {filename} = req.files[0];

        if(!subscriptionFinded) return res.status(404).send("Membresia no encontrada");

        const oldImage = subscriptionFinded.principalImage.split('/images/')[1];
        const oldImageRoute = path.join(__dirname, '..', 'public', 'images', oldImage);

        deleteImage(oldImageRoute)

        const updatedSubscription = await Subscription.findByIdAndUpdate(id, {
            principalImage: `${process.env.ROOT_URL}/images/${filename}`
        })

        res.status(200).send("Imágen actualizada correctamente.")

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

CreateSubscription.deleteSubscription = async (req,res) => {
    try {

        const {id} = req.params;
        const subscriptionFinded = await Subscription.findById(id)

        if(!subscriptionFinded) return res.status(404).send("No se ha encontrado dicha membresia.");

        const image = subscriptionFinded.principalImage.split('/images/')[1];
        const dirImage = path.join(__dirname, '..', 'public', 'images', image);
        deleteImage(dirImage)

        await Subscription.findByIdAndDelete(id);

        res.status(200).send("Membresia eliminada correctamente")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

CreateSubscription.getSubscriptions = async (req, res) => {
    try {
        const subscriptionsFinded = await Subscription.find()

        if(!subscriptionsFinded) return res.status(404).send("No hay membresias creadas.");

        res.status(200).send(subscriptionsFinded)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = CreateSubscription
