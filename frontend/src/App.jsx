import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login/Login';
import Registration from './component/Register/Registration';
import UserPage from './component/UserPage/UserPage';
import Home from './component/Home/Home';

function App() {

  return (
    <Router>
      <Routes>   
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
