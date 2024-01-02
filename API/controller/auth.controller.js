const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET_KEY =  '956e829076b2e3d7f4e380692c51965294b8d63e5f5bbd42df5ec79833877d1472b5aff90d19ed9b1395198dd4817f3b4753132c5eda5c46d1411d3e8c03ad7f'; // Replace with your actual secret key

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://haripriya14022003:haripriya14022003@hari.8d4mvvp.mongodb.net/Registration', { useNewUrlParser: true, useUnifiedTopology: true });

// User model
const User = require('./models/register');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Register route
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Forgot password route
app.post('./Forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate and send reset password token via email
    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1d' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'haripriya14022003@gmail.com',
        pass: 'your-gmail-password', // Replace with your actual Gmail password
      },
    });

    const mailOptions = {
      from: 'haripriya14022003@gmail.com',
      to: email,
      subject: 'Your Password Reset Token',
      text: `Use the following link to reset your password: http://localhost:3000/Resetpassword/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email' });
      }

      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Reset password email sent successfully.' });
    });
  } catch (error) {
    console.error('Error in forgot password route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Reset password route
app.post('/Resetpassword', verifyToken, async (req, res) => {
  try {
    const { token,password } = req.body;

    //verify the token
    const decodedToken =jwt.verify(token, '956e829076b2e3d7f4e380692c51965294b8d63e5f5bbd42df5ec79833877d1472b5aff90d19ed9b1395198dd4817f3b4753132c5eda5c46d1411d3e8c03ad7f')
    // Find the user by ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    if(error.name === 'JsonWebTokenError'){
    return res.status(500).json({ error: 'Internal Server Error' });
  }
    console.error(error);
    return res.status(500).json({error:'Internal server error'})
}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
