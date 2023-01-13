const {Schema, model} = require('mongoose');

const networkingSchema = new Schema({
    street: {type: String, required: true},
    city: {type: String, required: true},
    region: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    aboutWeImage: {type: String },
    aboutWeText: {type: String, required: true},
    whatsApp: {type: String, required: true},
    facebook: {type: String, required: true},
    instagram: {type: String, required: true},
    twitter: {type: String, required: true},
    linkedin: {type: String, required: true},
});

module.exports = model('Networking', networkingSchema);