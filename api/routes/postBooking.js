const express = require("express");
const router = express.Router();
const userDetails = require("../models/rentalBooking.js");


const validatePayload = (req, res, next) => {
    try {
        //here I have added validations to check allowed keys and other combinations
        const allowedKeys = ["firstname", "lastname", "vehicle_wheels", "vehicle_type", "vehicle_model", "start_date", "end_date"];

        const bodyKeys = Object.keys(req.body);
        const invalidKeys = bodyKeys.filter(key => !allowedKeys.includes(key.toLowerCase()));
        const missingKeys = allowedKeys.filter(key => !bodyKeys.includes(key.toLowerCase()));
        //throws error if any key other than allowed key is added
        if (invalidKeys.length > 0) {
            return res.status(400).json({ error: `Invalid payload keys: ${invalidKeys.join(", ")}` });
        }
         //throws error if any required allowed key is missed
        if (missingKeys.length > 0) {
            return res.status(400).json({ error: `Missing payload keys: ${missingKeys.join(", ")}` });
        }
        // Validate vehicle_wheels (case-insensitive)
        const allowedVehicleWheels = ["2", "4"];
        if (!allowedVehicleWheels.includes(req.body.vehicle_wheels.toLowerCase())) {
            return res.status(400).json({ error: `Invalid vehicle_wheels: ${req.body.vehicle_wheels}, it should be ${allowedVehicleWheels.join(", ")}` });
        }
        //validating this are the required fields to work on
        const options = {
            "2": {
                "models": ["sports", "cruiser"],
                "options": {
                    "sports": ["pulsar", "yamaha"],
                    "cruiser": ["honda CB350", "harley Davidson"]
                }
            },
            "4": {
                "models": ["hatchback", "suv", "sedan"],
                "options": {
                    "hatchback": ["toyota yaris", "volkswagen golf"],
                    "SUV": ["ford explorer", "toyota rav4"],
                    "sedan": ["honda accord", "toyota camry"]
                }
            }
        };
        //throws error if vehicle wheels are other than 2, 4
        const selectedOptions = options[req.body.vehicle_wheels.toLowerCase()];
        if (!selectedOptions) {
            return res.status(400).json({ error: `Invalid vehicle_wheels: ${req.body.vehicle_wheels}` });
        }
         //throws error if vehicle type error comes
        if (!selectedOptions.models.includes(req.body.vehicle_type.toLowerCase())) {
            return res.status(400).json({ error: `Invalid vehicle_type: ${req.body.vehicle_type}, it should be ${selectedOptions.models.join(", ")}` });
        }
        //throws error if vehicle name error comes
        const allowedModels = selectedOptions.options[req.body.vehicle_type.toLowerCase()];
        if (!allowedModels || !allowedModels.includes(req.body.vehicle_model.toLowerCase())) {
            return res.status(400).json({ error: `Invalid vehicle_model: ${req.body.vehicle_model}, it should be ${allowedModels.join(", ")}` });
        }
        next();
    }
    catch (error) {
        console.log("POST BOOKINGS | VALIDATIONS | RENTAL | DATA", error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

router.post('/rental', validatePayload, (req, res) => {
    try {
        const { firstname, lastname, vehicle_type, vehicle_model, vehicle_wheels, start_date, end_date } = req.body
        const user = new userDetails({ firstname, lastname, vehicle_wheels, vehicle_type, vehicle_model, start_date, end_date })
        user.save().then((data, error) => {
            if (error) {
                console.log("ERROR | DATA", error)
                return res.status(400).send({ errors: { message: 'Something went wrong' } })
            }
            return res.status(400).send({ data: { item: data } })
        })
    }
    catch (error) {
        console.log("POST BOOKINGS | MAIN | POST | RENTAL | DATA", error);
        return res.status(500).json({ error: 'Something went wrong' });

    }
});

module.exports = router;
