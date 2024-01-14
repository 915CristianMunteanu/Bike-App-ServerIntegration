const Bike = require('./Bike');

class BikeService {
    constructor() {
        this.bikes = [];
    }

    // Display all bikes
    getAllBikes() {
        return this.bikes;
    }

    // Find a bike by ID
    getBikeById(id) {
        return this.bikes.find(bike => bike.id === id);
    }

    // Add a new bike
    addBike(bikeData) {
        // Assuming bikeData is an object with { brand, model, color, serviceDue }
        const newBike = new Bike(
            this.bikes.length + 1, 
            bikeData.brand, 
            bikeData.model, 
            bikeData.color, 
            bikeData.serviceDue
        );
        this.bikes.push(newBike);
        return newBike;
    }

    // Update an existing bike
    updateBike(id, bikeData) {
        let bikeIndex = this.bikes.findIndex(bike => bike.id === id);
        if (bikeIndex !== -1) {
            // Create a new bike object with the new data and the same id
            const updatedBike = new Bike(id, bikeData.brand, bikeData.model, bikeData.color, bikeData.serviceDue);
            this.bikes[bikeIndex] = updatedBike;
            return updatedBike;
        }
        return null; // If no bike is found with the given id, return null
    }

    // Remove a bike
    removeBike(id) {
        const bikeIndex = this.bikes.findIndex(bike => bike.id === id);
        if (bikeIndex !== -1) {
            return this.bikes.splice(bikeIndex, 1)[0];
        }
        return null;
    }
}

module.exports = new BikeService();

