const {Schema, model} = require('mongoose');

const heroCardSchema = new Schema(    {
    image: {
        type: String,
        required: true
    },
    disclaimer: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    buttonLink: {
        type: String,
        required: true
    }
});

module.exports = model('HeroCard', heroCardSchema);