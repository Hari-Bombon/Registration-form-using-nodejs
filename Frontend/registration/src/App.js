import React from 'react';
import RegistrationForm from './Registration';
import { BrowserRouter, Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Registration</h1>
      <RegistrationForm />
    </div>
  );
}

export default App;
