const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    userImage: {
        type: String,
        required: true
    },

    backgroundImage: {
        type: String,
        required: true 
    },
    
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    cellphone: String,

    email: {
        type: String,
        required: true,
        unique: true
    },

    userId: {
        type: Number,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],

    shoppingCart: [{
        ref: "Product",
        type: Schema.Types.ObjectId
    }],

    membershipsCart: [{
        ref: "Membership",
        type: Schema.Types.ObjectId
    }],

    shoppingHistory: [{
        ref: "Purchase",
        type: Schema.Types.ObjectId
    }],

    notifications: [{
        subject: String,
        message: String,
        redirect: String
    }],

    directions: [{
        name: String,
        region: String,
        commune: String,
        street: String,
        number: String,
        departament: String,
        details: String,
    }],

    socialMedia: [{
        name: String,
        link: String,
        color: String
    }],

    membership: [{
        ref: "Membership",
        type: Schema.Types.ObjectId
    }],

    daysMembership: {
        type:Number,
        required: true
    },

    imageQr: {
        type: String,
        required: true
    },

    job: {
        type: String,
        required: true
    },

    organization: {
        type: String,
        required: true
    },

    location: {
        country: String,
        city: String,
        address: String
    },

    biography: {
        type: String,
        required: true
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
    }


}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

module.exports = model('User', userSchema);