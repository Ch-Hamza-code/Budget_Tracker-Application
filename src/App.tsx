import React from 'react';
import ResetPassword from './Pages/Authentication/Reset/Reset';
import Login from './Pages/Authentication/Login/Login'
import SignUp from './Pages/Authentication/Signup/Signup';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Reset" element={<ResetPassword />} />
      <Route path="/Signup" element={<SignUp />} />
    </Routes>
  </Router>
  );
}

export default App;
