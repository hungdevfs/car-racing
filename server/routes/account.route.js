const express = require("express")

const { accountController } = require("../controllers")

const router = express.Router()

router.post("/login", accountController.logIn)

router.get("/info", accountController.getInfo)

router.post("/signup", accountController.signUp)

router.post("/confirmsignup", accountController.confirmSignUp)

router.post("/forgotpassword", accountController.forgotPassword)

router.post("/confirmforgotpassword", accountController.confirmForgotPassword)

module.exports = router