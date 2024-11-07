const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codex-staging', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Mongoose Schemas and Models
const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const submissionSchema = new mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  code: String,
  marks: Number,
});

const Question = mongoose.model('Question', questionSchema);
const Submission = mongoose.model('Submission', submissionSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Coding Challenge Platform Backend');
});

// Route for executing code
app.post('/api/execute', async (req, res) => {
  const { script, language, versionIndex } = req.body;

  if (!script || !language || !versionIndex) {
    return res.status(400).json({ error: 'Missing required fields: script, language, versionIndex' });
  }

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script,
      language,
      versionIndex,
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET
    });

    res.json(response.data);
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({ error: 'Execution error occurred' });
  }
});

// Routes for questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Error fetching question' });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ error: 'Error saving question' });
  }
});

// Routes for submissions
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Error fetching submissions' });
  }
});

app.post('/api/submissions', async (req, res) => {
  try {
    const { questionId, code } = req.body;
    if (!questionId || !code) {
      return res.status(400).json({ error: 'Question ID and code are required' });
    }
    const submission = new Submission({ questionId, code });
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Error saving submission' });
  }
});

app.put('/api/submissions/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { marks: req.body.marks },
      { new: true }
    );
    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ error: 'Error updating submission' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});