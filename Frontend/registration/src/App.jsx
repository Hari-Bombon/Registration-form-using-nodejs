import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../src/pages/Login';
import Home from '../src/pages/Home';
import RegistrationForm from '../src/pages/RegistrationForm';



function App() {
  return (
    <Router>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path="/registrationform" element={<RegistrationForm />} />
  </Routes>

    </Router>
  );
}

export default App;
