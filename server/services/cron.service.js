const cron = require("node-cron")
const { checkRef } = require("./account.service")

// check ref every 60 mins
let isCheckingRef = false
const checkRefCronJob = () => cron.schedule('*/60 * * * *', async () => {
    if (isCheckingRef) return
    isCheckingRef = true
    await checkRef()
    isCheckingRef = false
})

module.exports = {
    checkRefCronJob
}