const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const app = express()
dotenv.config()
const getVehicleDetails = require('./routes/vehicleDetails.js')
const postRentalData = require('./routes/postBooking.js')

app.use(bodyParser.json())
app.use(cors())


const db = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.ihestjc.mongodb.net/${process.env.MONGO_DB_PROJECT_NAME}?retryWrites=true&w=majority`
mongoose.connect(db)
.then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });
app.use('/', getVehicleDetails)
app.use('/', postRentalData)

app.get('/', (req, res) => {
    res.send("Hello from the server...")
})
app.listen(process.env.PORT, (req, res) => {
    console.log("Server is running at PORT :", process.env.PORT)
})