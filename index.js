const express = require('express');
const app = express();
const port = 3000;
const bikeRoutes = require('./BikeRoutes');

app.use(express.json()); // Middleware for parsing JSON request bodies
app.use('/api', bikeRoutes); // Mount the bike routes

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});