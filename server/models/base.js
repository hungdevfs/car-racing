const timeProperties = {
    createdAt: {
        type: Number,
        required: true,
        default: 0
    },
    updatedAt: {
        type: Number,
        required: true,
        default: 0
    },
    deletedAt: {
        type: Number,
        required: true,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
}

module.exports = {
    timeProperties
}