const {Schema, model} = require('mongoose');

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    author: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    textButtonOne: {
        type: String,
    },
    linkButtonOne: {
        type: String,
    },
    textButtonTwo: {
        type: String,
    }, 
    linkButtonTwo: {
        type: String,
    },
    disclaimer: {
        type: String,
    },
});

module.exports = model('New', newsSchema);