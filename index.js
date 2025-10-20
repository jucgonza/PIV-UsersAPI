const express = require('express');
const app = express();
const { users } = require('./data/users.js');

const PORT = 3000;

// Middleware to read body in JSON
app.use(express.json());


// *** ENDPOINTS: ***

app.get('/users', (req, res) => {
    res.json({
        status: true,
        message: 'Success',
        data: users
    });
})

app.post('/users', (req, res) => {

    if(!req.body || !req.body.name || !req.body.phone || !req.body.email || !req.body.address || !req.body.age || !req.body.photoUrl){
        res.status(400).json({
            status: false,
            message: "All fields are required. Check your inputs and try again."
        })
        return;
    }

    const { name, phone, email, address, age, photoUrl } = req.body;

    users.unshift({id: users.length + 1, name, phone, email, address, age, photoUrl});

    res.json({
        status: true,
        message: "User created successfully!"
    })
})

app.use((req, res) => {
    res.status(404).json({
        status: false,
        message: "Page not found"
    })
})

app.listen(PORT, () => {
    console.log(`App running in http://localhost:${PORT}`);
})