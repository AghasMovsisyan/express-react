import React from 'react';
import Login from './component/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './component/Register/Registration';
import UserPage from './component/UserPage/UserPage';

function App() {

  return (
    <Router>
      <Routes>   
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/user/:id" element={<UserPage />} /> {/* UserPage route */}
        <Route path="*" element={<Login />} />
      </Routes>

    </Router>
  );
}

export default App;
