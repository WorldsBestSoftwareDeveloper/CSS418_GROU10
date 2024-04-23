const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/futminna', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema
const userSchema = new mongoose.Schema({
  studentId: String,
  matricNumber: String,
  password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
app.get('/', (req, res) => {
  res.send('Welcome to Futminna!');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
  const { studentId, matricNumber, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ studentId });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Create new user
  const newUser = new User({ studentId, matricNumber, password });
  await newUser.save();

  res.send('User registered successfully');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/futminna', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema
const userSchema = new mongoose.Schema({
  studentId: String,
  matricNumber: String,
  password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
app.get('/', (req, res) => {
  res.send('Welcome to Futminna!');
});

app.get('/register', (req, res) => {
  res.send('Register a new account');
});

app.post('/register', async (req, res) => {
  const { studentId, matricNumber, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ studentId });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Create new user
  const newUser = new User({ studentId, matricNumber, password });
  await newUser.save();

  res.send('User registered successfully');
});

app.get('/login', (req, res) => {
  res.send('Login to your account');
});

app.post('/login', async (req, res) => {
  const { studentId, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ studentId, password });
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // Redirect to homepage
  res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});