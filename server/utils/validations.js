const {
    MILISECONDS_PER_MINUTE,
    REQUEST_EXPIRE_TIME
} = require("./constants")

const password = (str) =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W\s\_]).{8,}$/.test(str)

const phone = (str) =>
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(str)

const validateRequest = (pendingSignUpRequest) => {
    try {
        const now = new Date().getTime()
        const diffMinutes =
            (now - pendingSignUpRequest.time) / MILISECONDS_PER_MINUTE
        return diffMinutes <= 15
    } catch (err) {
        return false
    }
}

module.exports = {
    password,
    phone,
    validateRequest
}