const path = require('path')
const Subscription = require(path.join(__dirname, '..', 'models', 'subscriotion.model'))

const CreateSubscription = {};

CreateSubscription.getCreate = async (req, res) => {
    try {
        const { filename } = req.files[0];
        
        const newSubscription = new Subscription({
            ...req.body,
            principalImage: `${process.env.ROOT_URL}/images/${filename}`
        })

        const savedSubscription = await newSubscription.save();

        res.status(201).send({
            savedSubscription,
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

module.exports = CreateSubscription
