import React, { useState } from 'react';



const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    name:'',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
  
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
          <br/>

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
        <br/>
    
        <button type="submit">Login</button>
      </form>
 </>
  );
};

export default LoginForm;
