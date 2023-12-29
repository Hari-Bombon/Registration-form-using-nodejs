import axios from 'axios';
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/Login", loginData)
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success('Login successful!')
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        toast.error('An error occurred. Please try again.');
        console.error(error);
      });
  };

  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="name"
            name="name"
            value={loginData.name}
            onChange={handleChange}
            required
          />
          <br />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <Link to='/Register'>
          <p>New User? Register here</p>
        </Link>
      </form>
      <Toaster />
    </>
  );
};

export default LoginForm;
