import axios from 'axios';
import React, { useState } from 'react';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleforgotpassword = async () => {
    try {
      const response = await axios.post('http://localhost:8000/forgotpassword', { email });
      setMessage(response.data.message);
    } catch (error) {
        setMessage('Error requesting password reset');

    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button onClick={handleforgotpassword}>Request Password Reset</button>
      <p>{message}</p>
    </div>
  );
};

export default Forgotpassword;
