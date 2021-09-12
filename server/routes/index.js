const express = require("express")

const accountRoute = require("./account.route")

const router = express.Router()

router.use("/v1/account", accountRoute)

module.exports = router