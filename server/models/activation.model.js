const mongoose = require("mongoose")
const { timeProperties } = require("./base")
const { constants } = require("../utils")

const { ACTIVATION_TYPES } = constants
const types = Object.values(ACTIVATION_TYPES)

const Schema = mongoose.Schema

const activationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: types
    },
    content: {
        type: String,
        default: ""
    },
    ...timeProperties
})

const Activation = mongoose.model("Activation", activationSchema)

module.exports = Activation