import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import '../navbar/navbar.module.css';

interface User {
    id: number;
    username: string;
}

interface NavBarProp {
    currentUser: User | null;
    onLogout: () => void;
}

export const navbar = ({ currentUser, onLogout }: NavBarProp) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login')
    };


  (
    <nav className="navbar">
      <Link to={currentUser ? "/home" : "/"} className="navbar-logo">
        JobTracker
      </Link>

      <div className="navbar-links">
        {currentUser ? (
          <>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              My applications
            </NavLink>
            <span className="navbar-user">{currentUser.username}</span>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}



