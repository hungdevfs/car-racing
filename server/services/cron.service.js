const cron = require("node-cron")
const { checkRef } = require("./account.service")

// check ref every 60 mins
const checkRefCronJob = () => cron.schedule('*/60 * * * *', () => {
    checkRef()
})

module.exports = {
    checkRefCronJob
}