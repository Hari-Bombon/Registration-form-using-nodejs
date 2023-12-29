import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import LoginForm from '../src/pages/Login';
import RegistrationForm from '../src/pages/RegistrationForm';
import Sidebar from '../src/pages/Sidebar';





function App() {
  return (
    <>

    <Router>
    <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<LoginForm />} />
        <Route path="/Register" element={<RegistrationForm />} />
        <Route path='/Sidebar' element={<Sidebar />} />


  </Routes>
  </Router>
   
    </>
  )
}

export default App;
