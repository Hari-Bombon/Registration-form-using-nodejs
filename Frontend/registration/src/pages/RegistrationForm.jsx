import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../src/style/App.css';
import { toast } from 'react-hot-toast';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, gender, phone, email, password, cpassword } = formData;
    try {
      const { data } = await axios.post('http://localhost:8000/register', {
        firstname,
        lastname,
        gender,
        phone,
        email,
        password,
        cpassword,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setFormData({});
        toast.success('Registration successful, Welcome to NCGlobalMedia');
        navigate('/login');
      }
    } catch (error) {
      toast.error('An error occurred during registration. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </label>
        <br />

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your mail id"
            required
          />
        </label>
        <br />

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </label>
        <br />

        <button type="submit">Register</button>
        <Link to="/login">
          <p>Already have an account? Login here</p>
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
