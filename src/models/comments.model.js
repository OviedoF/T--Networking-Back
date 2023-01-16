const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    author: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    comment: {
        type: String,
        required: true
    },
    aproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = model('Comment', commentSchema);