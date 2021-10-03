const axios = require("axios")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()
app.use(express.static(__dirname + "/static"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.status(200).send(`Server is running. Current time: ${new Date()}`)
})

const uri = process.env.MONGO_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once("open", () =>
    console.log("MongoDB database connected successfully!")
)

// init configs
const { Config } = require("./models")
Config.countDocuments({}, async (err, count) => {
    if (!count) {
        const config = new Config({})
        await config.save()
    }
})

// cron jobs
const { checkRefCronJob } = require("./services/cron.service")
checkRefCronJob()

// routers
const router = require("./routes")
app.use("/api", router)