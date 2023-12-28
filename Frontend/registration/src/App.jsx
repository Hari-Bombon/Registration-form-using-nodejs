import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from '../src/pages/Registration';
import LoginForm from '../src/pages/Login';
import Home from '../src/pages/Home';


function App() {
  return (
    <Router>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/registration' element={<Registration />} />
  </Routes>

    </Router>
  );
}

export default App;
