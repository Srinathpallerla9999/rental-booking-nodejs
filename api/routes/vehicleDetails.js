const express = require("express");
const router = express.Router();

router.get('/vehicle-details', (req, res) => {
  const vehicleTypes = [2, 4];

  // Define a result object to store details for each vehicle type
  const result = {};

  vehicleTypes.forEach(vehicleType => {
    let models, options;
    // Validate the selected vehicle type
    if (![2, 4].includes(vehicleType)) {
      return res.status(400).json({ error: `Invalid vehicle type: ${vehicleType}` });
    }
    if (vehicleType === 2) {
      // For 2-wheeler
      models = ['sports', 'cruiser'];
      options = {
        sports: ['Pulsar', 'Yamaha'],
        cruiser: ['Honda CB350', 'Harley Davidson'],
      };
    } else if (vehicleType === 4) {
      // For 4-wheeler
      models = ['hatchback', 'SUV', 'sedan'];
      options = {
        hatchback: ['Toyota Yaris', 'Volkswagen Golf'],
        suv: ['Ford Explorer', 'Toyota RAV4'],
        sedan: ['Honda Accord', 'Toyota Camry'],
      };
    };
    // Store details for each vehicle type in the result object
    result[vehicleType] = { models, options };
  });

  res.status(200).json(result);
});

module.exports = router;
