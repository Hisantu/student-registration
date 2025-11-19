const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Read env vars
const PORT = process.env.PORT || 36000;
const MONGO_URL = "mongodb+srv://student:student123@cluster0.htcnzfq.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Cluster0";


const app = express();

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Model
const Student = require('./models/Student');

// Routes

// Create student
app.post('/api/students', async (req, res) => {
  try {
    const { name, email, course, roll } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

    const student = new Student({ name, email, course, roll });
    await student.save();
    res.status(201).json({ message: 'Student registered', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fallback to index for SPA behavior (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
