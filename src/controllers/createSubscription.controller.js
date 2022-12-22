const path = require('path')
const Subscription = require(path.join(__dirname, '..', 'models', 'subscriotion.model'))

const CreateSubscription = {};

CreateSubscription.getCreate = async (req, res) => {
    try {

    } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}