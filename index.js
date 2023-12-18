import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

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
  });
  
const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image: String,
});

const Card = mongoose.model('Card', cardSchema);

app.post('/create-card', async (req, res) => {
  const { title, description, userId } = req.body;
  const image = req.body.image;

  try {
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
