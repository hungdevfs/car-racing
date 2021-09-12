const jwt = require("jsonwebtoken")
const passwordHash = require("password-hash")
const { nanoid } = require('nanoid')

const {
    constants,
    mail,
    validations,
} = require("../utils")

const { ACTIVATION_TYPES } = constants

const { User } = require("../models")
const activationService = require("./activation.service")

const logIn = async ({ email, password }) => {
    const user = await User.findOne({ email }).lean()
    if (!user) throw new Error("Wrong email or password")

    const passed = passwordHash.verify(password, user.password)
    if (!passed) throw new Error("Wrong email or password")

    const data = {
        _id: user._id,
        email: user.email,
        roles: user.roles,
    }

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE,
    })

    await activationService.add({
        userId: user._id,
        type: ACTIVATION_TYPES.LOGIN,
        createdAt: Date.now()
    })

    return { data, accessToken }
}

const getInfo = async (token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    const user = await User.findOne({ _id: userInfo._id }).lean()
    if (!user) throw new Error("User doesn't exist")

    return {
        _id: userInfo._id,
        email: userInfo.email,
        roles: user.roles,
        name: user.name
    }
}

let pendingSignUpRequests = []
const signUp = async ({ email, password, refFrom }) => {
    const duplicateRecord = await User.findOne({ email })
    if (!!duplicateRecord) throw new Error("Duplicate user email")
    if (!validations.password(password)) throw new Error("Invalid password")

    const time = Date.now()
    const newPendingSignUpRequest = {
        _id: nanoid(),
        time,
        data: {
            email,
            password: passwordHash.generate(password),
            refFrom
        },
    }
    pendingSignUpRequests = pendingSignUpRequests.filter(
        (request) => request.data.email !== email,
    )
    pendingSignUpRequests.push(newPendingSignUpRequest)
    await mail.sendSignUpEmail(email, newPendingSignUpRequest._id)
}

const confirmSignUp = async (pendingSignUpRequestId) => {
    pendingSignUpRequests = pendingSignUpRequests.filter((request) =>
        validations.validateRequest(request),
    )

    const pendingSignUpRequest = pendingSignUpRequests.find(
        (request) => request._id === pendingSignUpRequestId,
    )
    if (!pendingSignUpRequest) throw new Error("Invalid request")
    const newUser = new User({
        ...pendingSignUpRequest.data,
        refCode: nanoid(8),
        createdAt: Date.now()
    })

    await newUser.save()

    pendingSignUpRequests = pendingSignUpRequests.filter(
        (request) => request._id !== pendingSignUpRequestId,
    )

    console.log({newUser})

    await activationService.add({
        userId: newUser._id,
        type: ACTIVATION_TYPES.SIGNUP_CONFIRM,
        createdAt: Date.now()
    })
}

let pendingForgotPasswordRequests = []
const forgotPassword = async (email) => {
    const user = await User.findOne({ email }).lean()
    if (!!user) {
        const token = nanoid()
        const now = Date.now()
        pendingForgotPasswordRequests = pendingForgotPasswordRequests.filter(item => item.email !== email)
        pendingForgotPasswordRequests.push({
            email,
            time: now,
            token
        })
        await mail.sendForgotPasswordEmail(email, token)

        await activationService.add({
            userId: user._id,
            type: ACTIVATION_TYPES.FORGOT_PASSWORD_REQUEST,
            createdAt: Date.now()
        })
    }
}

const confirmForgotPassword = async ({ token, newPassword }) => {
    pendingForgotPasswordRequests = pendingForgotPasswordRequests.filter((request) =>
        validations.validateRequest(request),
    )

    const pendingForgotPasswordRequest = pendingForgotPasswordRequests.find(
        (request) => request.token === token,
    )
    if (!pendingForgotPasswordRequest) throw new Error("Invalid request")
    if (!validations.password(newPassword)) throw new Error("Invalid password")

    const user = await User.findOne({ email: pendingForgotPasswordRequest.email })
    user.password = passwordHash.generate(newPassword)

    await user.save()
    await activationService.add({
        userId: user._id,
        type: ACTIVATION_TYPES.FORGOT_PASSWORD_CONFIRM,
        createdAt: Date.now()
    })
}

module.exports = {
    logIn,
    getInfo,
    signUp,
    confirmSignUp,
    forgotPassword,
    confirmForgotPassword
}