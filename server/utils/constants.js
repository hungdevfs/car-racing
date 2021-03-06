const MILISECONDS_PER_MINUTE = 1000 * 60

const REQUEST_EXPIRE_TIME = 15

const ACTIVATION_TYPES = {
    LOGIN: "LogIn",
    SIGNUP_CONFIRM: "SignUpConfirm",
    FORGOT_PASSWORD_REQUEST: "ForgotPasswordRequest",
    FORGOT_PASSWORD_CONFIRM: "ForgotPasswordConfirm",
    GET_FUND_FROM_REF: "GetFundFromRef"
}

module.exports = {
    MILISECONDS_PER_MINUTE,
    REQUEST_EXPIRE_TIME,
    ACTIVATION_TYPES
}