const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pets = require('./pets.json')

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Store pet data (Replace this with a database later)
// let pets = '';  // ✅ Only declare this once

// Route to get all pets
app.get("/pets", (req, res) => {
    res.json(pets);
});

// Route to add a new pet
app.post("/pets", (req, res) => {
    const pet = req.body;
    pets.push(pet);
    res.json({ message: "Pet added successfully!", pet });
});

// Route to search pets
app.get("/search", (req, res) => {
    const { query, color, age, price } = req.query;
    console.log("ihiih")
    console.log(pets,"pets")
    console.log(query,color,age,"hiiiii")
    let results = pets;

    if (query) {
        results = results.filter(pet => pet.petName.toLowerCase().includes(query.toLowerCase()));
    }
    if (color) {
        results = results.filter(pet => pet.petColor.toLowerCase() === color.toLowerCase());
    }
    if (age) {
        results = results.filter(pet => pet.petAge.toLowerCase() === age.toLowerCase());
    }
    if (price) {
        results = results.filter(pet => pet.petPrice <= parseInt(price));
    }

    res.json(results);
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
