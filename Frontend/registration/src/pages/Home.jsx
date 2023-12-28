// Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to ncGlobalmedia</h1>
      <p>Your trusted source for global news and media.</p>

      <div className="buttons-container">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/registrationform">
          <button className="signup-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

