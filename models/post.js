const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            require: true,
        },

        description: {
            type: String,
            require: true
        },

        likes: {
            type: Number,
            default: 0
        },

        tags: {
            type: [String],
            require: true
        },

        category: {
            type: String,
            required: true,
        },

        postImg: {
            type: String,
            required: true,
        },

        Date: {
            type: Date,
            default: Date.now
        }
        

    }
)

module.exports = mongoose.model("Posts", postSchema)