const generateSignUpEmail = (email, code) => {
    return {
        from: process.env.SYSTEM_EMAIL,
        to: email,
        subject: "Sign up request",
        text: `Your sign up confirmation code is ${code}`,
        html: `<h2>Your sign up confirmation code is ${code}. This code is expired after 15 mins</h2>`,
    }
}

const genarateForgotPasswordEmail = (email, code) => {
    return {
        from: process.env.SYSTEM_EMAIL,
        to: email,
        subject: "Recover password request",
        text: `Your confirmation code is ${code}`,
        html: `<h2>Your confirmation code is ${code}. Submit your code with new password in app to cotinue. This code is expired after 15 mins</h2>`,
    }
}

module.exports = {
    generateSignUpEmail,
    genarateForgotPasswordEmail
}