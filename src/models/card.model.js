const {Schema, model} = require('mongoose');

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    perfilImage: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: String,
        required: true
    },
    biography: {
        type: String
    },
    logoPhoto: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String
    },
    jobEntity: {
        type: String
    },
    email: {
        type: String
    },
    description: {
        type: String
    },
    socialMedia: [{
        color: String,
        name: String,
        url: String,
        favorite: Boolean,
        contrast: String
    }],
    location: {
        country: String,
        city: String,
        address: String
    },
    vcard: {
        type: String
    },
    vcardWants:{
        type: Boolean,
    },
    addContact: {
        type: Boolean,
        default: false
    },
    contactForm: {
        title: String,
        
        inputs: [{
            name: String,
            type: String,
            placeholder: String,
            required: Boolean
        }],

        button: {
            text: String,
            color: String
        },

        disclaimer: {
            text: String,
        }
    },
    imageQr: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    cardLink: {
        type: String,
        required: true,
        unique: true
    }, 

    cardStyle: {
        type: Schema.Types.ObjectId,
        ref: 'CardStyle'
    },

    historialStyles: [{
        type: Schema.Types.ObjectId,
        ref: 'CardStyle'
    }],

    cellphone: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Card', cardSchema);
