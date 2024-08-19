const express = require('express');
const { signUp , login, getSecurityQuestion, verifySecurityAnswer, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/get-security-question', getSecurityQuestion);
router.post('/verify-question', verifySecurityAnswer);
router.post('/reset-password', resetPassword);

module.exports = router;
