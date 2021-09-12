const mongoose = require("mongoose")
const { timeProperties } = require("./base")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    refCode: {
        type: String,
        required: true,
        minlength: 6
    },
    refFrom: {
        type: String
    },
    refChecked: {
        type: Boolean,
        required: true,
        default: false
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    ...timeProperties
})

const User = mongoose.model("User", userSchema)

module.exports = User