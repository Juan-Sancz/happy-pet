// src/App.js


import React, { useEffect, useState } from 'react';
import Shop from './components/shop.js'; // Import the InsertForm component
import Signup from './components/signup.js';
import Login from './components/login.js';
import Regispet from './components/regispet.js';
import Adop from './components/adop.js';
import Prod from './components/prod.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Shop />}></Route>
        <Route path='/' element={<Shop />}></Route>
        <Route path='/regispet' element={<Regispet />}></Route>
        <Route path='/adop' element={<Adop />}></Route>
        <Route path='/prod' element={<Prod />}></Route>

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;



