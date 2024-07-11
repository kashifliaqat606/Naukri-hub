import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaHome, FaBriefcase, FaPlusCircle, FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (!e.target.closest('.nav-bar') && !e.target.closest('.menu')) {
        setIsMenuOpen(false);
      }
    };

    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <header>
      <nav className="nav-bar">
        <h1>Naukari Hub</h1>
        <div className="nav-links">
          <a href="#" className="nav-item">
            <FaHome size={24} />
            <span>Home</span>
          </a>
          <a href="#" className="nav-item">
            <FaBriefcase size={24} />
            <span>My Jobs</span>
          </a>
          <a href="#" className="nav-item">
            <FaPlusCircle size={24} />
            <span>Post Job</span>
          </a>
          <a href="#" className="nav-item">
            <FaBell size={24} />
            <span>Notifications</span>
          </a>
          <a href="#" className="nav-item">
            <FaUser size={24} />
            <span>Profile</span>
          </a>
        </div>
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="menu">
          <a href="#">Home</a>
          <a href="#">My Jobs</a>
          <a href="#">Post Job</a>
          <a href="#">Notifications</a>
          <a href="#">Profile</a>
        </div>
      )}
    </header>
  );
};

export default Header;
