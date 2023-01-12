const path = require('path');
const FaqItem = require(path.join(__dirname, '..', 'models', 'faqitem.model'));

const faqItemController = {};

faqItemController.getFaqItems = async (req, res) => {
    try {
        const faqItems = await FaqItem.find();
        res.status(200).send(faqItems);
    } catch (error) {
        console.log(error);
        res.status(500).send
    }
};

faqItemController.createFaqItem = async (req, res) => {
    try {
        const {question, answer} = req.body;
        const faqItem = new FaqItem({question, answer});
        await faqItem.save();
        res.status(200).send(faqItem);
    }
    catch (error) {
        console.log(error);
        res.status(500).send
    }
};

faqItemController.deleteFaqItem = async (req, res) => {
    try {
        const {id} = req.params;
        await FaqItem.findByIdAndDelete(id);
        res.status(200).send('Faq item deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send
    }
};

module.exports = faqItemController;