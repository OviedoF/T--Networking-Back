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
    description: {
        type: String
    },
    socialMedia: [{
        color: String,
        name: String,
        url: String,
        favorite: Boolean
    }],
    location: {
        country: String,
        city: String,
        address: String
    },
    vcard: {
        type: String
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
    mobilePreview: {
        type: String,
        required: true
    },

    cardLink: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Card', cardSchema);
