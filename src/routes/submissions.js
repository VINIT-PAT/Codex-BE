// src/routes/submissions.js
const express = require('express');
const axios = require('axios');
const Submission = require('../models/Submission');

const router = express.Router();

// Route to execute Python code using JSDoodle
router.post('/execute', async (req, res) => {
  try {
    const { code } = req.body;
    const response = await axios.post('https://www.jdoodle.com/api/v1/execute', {
      script: code,
      language: 'python3',
      versionIndex: '3',
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    });
    const output = response.data.output;
    res.json({ output });
  } catch (error) {
    console.error('Error executing Python code:', error);
    res.status(500).json({ error: 'Failed to execute Python code' });
  }
});

// Route to submit student's code and output for grading
router.post('/:testId/submit', async (req, res) => {
  const { testId } = req.params;
  const { code, output } = req.body;
  try {
    const newSubmission = new Submission({
      testId,
      code,
      output,
    });

    await newSubmission.save();
    res.status(200).json({ message: 'Submission received' });
  } catch (error) {
    console.error('Error submitting code:', error);
    res.status(500).json({ error: 'Failed to submit code' });
  }
});

module.exports = router;
