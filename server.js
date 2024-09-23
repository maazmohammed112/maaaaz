const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// MongoDB Connection URI (replace <username>, <password>, and <dbname> with your actual values)
const mongoURI = 'mongodb+srv://maaz:Maaz@2002@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define routes, models, etc.

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
