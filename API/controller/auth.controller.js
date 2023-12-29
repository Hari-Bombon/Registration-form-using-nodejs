const User = require('../../Backend/src/models/register');
const { Validator } = require('node-input-validator');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, gender, email, phoneNumber, password, cpassword } = req.body;

    // Basic validation
    if (!firstname) {
      return res.json({
        error: "firstname is required",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: `Email ${email} already exists`,
      });
    }

    // Create user
    const user = await User.create({
      firstName: firstname,
      lastName: lastname,
      gender: gender,
      email: email,
      phone: phoneNumber,
      password: await bcrypt.hashSync(password, 10),
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
