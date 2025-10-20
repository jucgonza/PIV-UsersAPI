const express = require('express');
const cors = require('cors');
const app = express();
const { users } = require('./data/users.js'); // Import data

const PORT = 3000;

// CORS
app.use(cors());

// Middleware to read body in JSON
app.use(express.json());


// *** ENDPOINTS: ***

// Gets list of all users
app.get('/users', (req, res) => {
    res.json({
        status: true,
        message: 'Success',
        data: users
    });
})

// Creates a new user and prepend to the start of the list
app.post('/users', (req, res) => {

    // Validates that all required data is present first
    if(!req.body || !req.body.name || !req.body.phone || !req.body.email || !req.body.address || !req.body.age || !req.body.photoUrl){
        res.status(400).json({
            status: false,
            message: "All fields are required. Check your inputs and try again."
        })
        return;
    }

    const { name, phone, email, address, age, photoUrl } = req.body;

    // Prepend to the list of users
    users.unshift({id: users.length + 1, name, phone, email, address, age, photoUrl});

    res.json({
        status: true,
        message: "User created successfully!"
    })
})

// Not found handler
app.use((req, res) => {
    res.status(404).json({
        status: false,
        message: "Page not found"
    })
})

// Starts server
app.listen(PORT, () => {
    console.log(`App running in http://localhost:${PORT}`);
})