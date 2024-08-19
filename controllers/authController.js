const User = require('../models/User');

// Sign Up
exports.signUp = async (req, res) => {
  const { name, email, password, question, answer } = req.body;
  try {
    const user = new User({ name, email, password, question, answer });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error registering user', error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error logging in', error: err.message });
  }
};

// Get Security Question
exports.getSecurityQuestion = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ question: user.question });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error fetching security question', error: err.message });
  }
};

// Verify Security Question Answer
exports.verifySecurityAnswer = async (req, res) => {
  const { email, answer } = req.body;
  try {
    const user = await User.findOne({ email, answer });
    if (user) {
      res.status(200).json({ success: true, message: 'Answer verified' });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect answer' });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error verifying answer', error: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    await User.findOneAndUpdate({ email }, { password: newPassword });
    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error resetting password', error: err.message });
  }
};
