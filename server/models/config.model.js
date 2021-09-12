const mongoose = require("mongoose")

const Schema = mongoose.Schema

const configSchema = new Schema({
    initAmount: {
        type: Number,
        required: true,
        default: process.env.INIT_AMOUNT || 0
    },
    refAmount: {
        type: Number,
        required: true,
        default: process.env.REF_AMOUNT || 100
    },
    maxRefAllowed: {
        type: Number,
        required: true,
        default: process.env.MAX_REF_ALLOWED || 1000
    }
})

const Config = mongoose.model("Config", configSchema)

module.exports = Config