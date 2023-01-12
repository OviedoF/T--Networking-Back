const {Schema, model} = require('mongoose');

const FaqItemSchema = new Schema(    {
    question: {
        type: String,
        required: true
    }, 
    answer: {
        type: String,
        required: true
    }
});

module.exports = model('FaqItem', FaqItemSchema);