const { accountService } = require("../services")
const { getAccessToken } = require("../utils")

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await accountService.logIn({ email, password })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getInfo = async (req, res) => {
    try {
        const token = getAccessToken(req)
        const data = await accountService.getInfo(token)

        res.status(200).json(data)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const signUp = async (req, res) => {
    try {
        const { email, password, refFrom } = req.body
        await accountService.signUp({ email, password, refFrom })

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const confirmSignUp = async (req, res) => {
    try {
        const { pendingSignUpRequestId } = req.body
        await accountService.confirmSignUp(pendingSignUpRequestId)

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        await accountService.forgotPassword(email)

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const confirmForgotPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body
        await accountService.confirmForgotPassword({ token, newPassword })

        res.sendStatus(200)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    logIn,
    getInfo,
    signUp,
    confirmSignUp,
    forgotPassword,
    confirmForgotPassword
}