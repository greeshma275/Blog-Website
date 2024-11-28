// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;

const dbFile = './users.json'; // File to store user data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register Route
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    jsonfile.readFile(dbFile, (err, users) => {
        if (err) users = [];
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }

            // Save user to database
            const newUser = { username, password: hashedPassword };
            users.push(newUser);

            jsonfile.writeFile(dbFile, users, err => {
                if (err) {
                    return res.status(500).json({ message: 'Error saving user data' });
                }
                res.status(200).json({ message: 'User registered successfully' });
            });
        });
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    jsonfile.readFile(dbFile, (err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            res.status(200).json({ message: 'Login successful' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
