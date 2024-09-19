
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/signup');
  };

  const handleLoginWithOtherAccount = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleSignupWithOtherAccount = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/signup');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Home</Link>
      {isAuthenticated ? (
        <div className="auth-actions">
       
          <button onClick={handleLoginWithOtherAccount}>Login with Other Account</button>
          <button onClick={handleSignupWithOtherAccount}>Signup with Other Account</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login" className="login-link">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
