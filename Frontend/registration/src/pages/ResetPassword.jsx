import React, { useState } from 'react';
import axios from 'axios';

const Resetpassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetpassword = async () => {
    try {
       const response = await axios.post('http://localhost:3000/Resetpassword', { token, password });
       setMessage(response.data.message);
    } catch (error) {
       console.error(error.response.data.error);
       setMessage('Error resetting password');
    }
   };

  return (
    <div>
      <h2>Reset Password</h2>
      <label>
        Token:
        <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
      </label>
      <label>
        New Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleResetpassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default Resetpassword;
