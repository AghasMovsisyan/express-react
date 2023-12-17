import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/databases', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // other fields if any
  });
  
  
const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image: String, // Adding an image field
  // Other fields for a card
});



  
const Card = mongoose.model('Card', cardSchema);
// Create a Mongoose Schema for User
// Update the create-card endpoint to handle image uploads
app.post('/create-card', async (req, res) => {
  const { title, description, userId } = req.body; // Assuming you receive title, description, and userId
  const image = req.body.image; // Assuming the image is sent as base64 or a file

  try {
    // Create a new card linked to the user
    const newCard = new Card({ title, description, userId, image });
    await newCard.save();

    res.status(201).json({ message: 'Card created successfully' });
  } catch (error) {
    console.error('Card Creation Error:', error);
    res.status(500).json({ message: 'Card creation failed' });
  }
});


app.get('/user-cards/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('Received userId:', userId);

  try {
    const cards = await Card.find({ userId });
    console.log('Fetched cards:', cards);

    res.status(200).json({ cards });
  } catch (error) {
    console.error('Error fetching user cards:', error);
    res.status(500).json({ message: 'Failed to fetch user cards' });
  }
});


const User = mongoose.model('User', userSchema);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Inside register endpoint

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Inside login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password are not empty
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id }); // Send user ID
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
