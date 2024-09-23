const mongoose = require('mongoose');
const User = mongoose.models.User;

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
    const { username, password } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    // Check if user exists in MongoDB and if the password matches
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
