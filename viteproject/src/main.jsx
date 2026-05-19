import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  // ⚠️ Must import CSS

import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';



import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      {/* Login Modal Globally Available */}
      <Login />
      {/* Signup Modal Globally Available */}
      <Signup />
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Home />} />
      </Routes>

    </BrowserRouter>

  </StrictMode>
);