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
    }
});

module.exports = model('New', newsSchema);