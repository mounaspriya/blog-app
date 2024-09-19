// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/signup" />} />


        <Route path="/signup" element={<Signup />} />


        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

 
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/login" />
          )}
        />

   
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
