const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        trim: true
    },
    lastname: {
        required: true,
        type: String,
        trim: true
    },
    vehicle_wheels: {
        required: true,
        type: String,
        trim: true
    },
    vehicle_type: {
        required: true,
        type: String,
        trim: true
    },
    vehicle_model: {
        required: true,
        type: String,
        trim: true
    },
    start_date: {
        required: true,
        type: String,
        trim: true
    },
    end_date: {
        required: true,
        type: String,
        trim: true
    },
})

console.log("RENTAL | BOOKING | USER SCHEMA", userSchema)

module.exports = mongoose.model("UserData", userSchema, "UserData")