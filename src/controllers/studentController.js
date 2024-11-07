const Test = require('../models/Test');
const Submission = require('../models/Submission');

const getAvailableTests = async (req, res) => {
  // Logic to get available tests for the student
};

const getTestDetails = async (req, res) => {
  const { testId } = req.params;
  // Logic to get the details of a specific test
};

const submitTest = async (req, res) => {
  const { testId } = req.params;
  const { answers } = req.body;
  // Logic to submit test answers
};

module.exports = {
  getAvailableTests,
  getTestDetails,
  submitTest,
};
