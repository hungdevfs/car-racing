const mongoose = require("mongoose")
const { timeProperties } = require("./base")

const Schema = mongoose.Schema

const racerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  national: {
    type: String,
    trim: true
  },
  age: {
    type: Number
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  image: {
    type: String
  },
  winImage: {
    type: String
  },
  ...timeProperties
})

const Racer = mongoose.model("Racer", racerSchema)

module.exports = Racer
