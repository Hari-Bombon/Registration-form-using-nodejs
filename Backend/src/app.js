const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

app.use(cors());

// db
require("./db/Conn");
const Register = require("./models/register");
const JWT_SECRET_KEY="956e829076b2e3d7f4e380692c51965294b8d63e5f5bbd42df5ec79833877d1472b5aff90d19ed9b1395198dd4817f3b4753132c5eda5c46d1411d3e8c03ad7f"
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const registerPerson = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        password: hashedPassword,
        cpassword: hashedPassword,
        phone: req.body.phone,
      });

      const register = await registerPerson.save();
      res.json("Successfully registered")
      res.status(201).render("index"); 
    } else {
      res.send("Passwords do not match");
    }
  } catch (error) {
    res.status(400).send(error);
    console.log("issue with the validations",error)
  }
});


app.post("/Login", async(req,res)=>{
  try{
    const email = req.body.email;
    const password = req.body.password;
    const user = await Register.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json("Successfully logged in");
      } else {
        res.status(400).send("Invalid login credentials");
      }
    } else {
      res.status(400).send("User not registered");
    }
  }
    catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  app.post('/forgotpassword', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if the email exists in the database
      const user = await Register.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

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
  

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});