const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    linkedin: String,
    portfolio: String,
    profilePic: String,
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { username, password, linkedin, portfolio, profilePic } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, linkedin, portfolio, profilePic });

    try {
        await newUser.save();
        res.status(201).send({ message: "Registration successful" });
    } catch (error) {
        res.status(500).send({ message: "Registration failed", error: error.message });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).send({ message: "Login successful" });
    } else {
        res.status(401).send({ message: "Invalid username or password" });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
