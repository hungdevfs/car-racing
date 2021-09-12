const { Activation } = require("../models")

const add = async ({ userId, type, content }) => {
    const newActivation = new Activation({
        user: userId,
        type,
        content,
        createdAt: Date.now()
    })

    await newActivation.save()
}

module.exports = {
    add
}