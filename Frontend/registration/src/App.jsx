import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../src/pages/Login';
import Home from '../src/pages/Home';
import RegistrationForm from '../src/pages/RegistrationForm';
import Navbar from './components/Navbar';
import {Toaster} from 'react-hot-toast'
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <Toaster poistion='bottom-right' toastOptions={{duration:2000}}/>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<LoginForm />} />
        <Route path="/Register" element={<RegistrationForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
  </Routes>
  </Router>
   
    </>
  )
}

export default App;
