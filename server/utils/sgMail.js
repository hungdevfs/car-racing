const sgMail = require("@sendgrid/mail")
const {
    generateSignUpEmail,
    genarateForgotPasswordEmail
} = require("./generateEmails")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendSignUpEmail = (email, code) => sgMail.send(generateSignUpEmail(email, code))
const sendForgotPasswordEmail = (email, code) => sgMail.send(genarateForgotPasswordEmail(email, code))

const mail = {
    sendSignUpEmail,
    sendForgotPasswordEmail
}

module.exports = mail