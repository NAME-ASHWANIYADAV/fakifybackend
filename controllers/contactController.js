const Contact = require('../models/Contact');

// Controller to handle contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create a new contact record
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save the contact to the database
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContactForm };
