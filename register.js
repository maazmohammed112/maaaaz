const mongoose = require('mongoose');

// User Schema definition (this is a basic example)
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  linkedin: String,
  portfolio: String,
  profilePic: String,
});

// Creating a User model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Connect to MongoDB function
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, linkedin, portfolio, profilePic } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new user document and save it to MongoDB
    const newUser = new User({
      username,
      password,
      linkedin,
      portfolio,
      profilePic,
    });

    try {
      await newUser.save();
      res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
