const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    linkedin: String,
    portfolio: String,
    profilePic: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
    try {
        const { username, password, linkedin, portfolio, profilePic } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, linkedin, portfolio, profilePic });
        await newUser.save();
        res.status(201).send({ message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Registration failed" });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).send({ message: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Create session or token here
            res.send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Login failed" });
    }
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://maaz:Maaz@2002@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(5000, () => console.log('Server running on port 5000'));
