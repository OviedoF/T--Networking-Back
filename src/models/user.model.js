const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    userImage: {
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

    email: {
        type: String,
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
        required: false
    },

    locations: [{
        country: String,
        city: String,
        address: String
    }],

    cards: [{
        ref: 'Card',
        type: Schema.Types.ObjectId
    }],

    googleId: {
        type: String,
        required: false
    },

    privacyType: {
        type: String,
        required: true
    },

    membershipDiscount: {
        type: Number,
        required: false
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