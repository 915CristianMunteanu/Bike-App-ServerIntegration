const express = require('express');
const router = express.Router();
const BikeService = require('./BikeService');

router.get('/bikes', (req, res) => {
    res.json(BikeService.getAllBikes());
});

router.get('/bikes/:id', (req, res) => {
    const bike = BikeService.getBikeById(parseInt(req.params.id));
    if (bike) {
        res.json(bike);
    } else {
        res.status(404).send('Bike not found');
    }
});

router.post('/bikes', (req, res) => {
    const newBike = BikeService.addBike(req.body);
    res.status(201).json(newBike);
});

router.put('/bikes/:id', (req, res) => {
    const updatedBike = BikeService.updateBike(parseInt(req.params.id), req.body);
    if (updatedBike) {
        res.json(updatedBike);
    } else {
        res.status(404).send('Bike not found');
    }
});

router.delete('/bikes/:id', (req, res) => {
    const bike = BikeService.removeBike(parseInt(req.params.id));
    if (bike) {
        res.json(bike);
    } else {
        res.status(404).send('Bike not found');
    }
});

module.exports = router;

