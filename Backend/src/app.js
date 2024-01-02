const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();

app.use(cors());

// db
require("./db/Conn");
const Register = require("./models/register");

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

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});