import React, { useState, useEffect } from 'react';
import './Header.css';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");
    const modeToggle = document.querySelector(".dark-light");
    
    const sidebarOpen = document.querySelector(".sidebarOpen");

    let getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark-mode") {
      body.classList.add("dark");
    }

    const toggleMode = () => {
      modeToggle.classList.toggle("active");
      body.classList.toggle("dark");
      if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
      } else {
        localStorage.setItem("mode", "dark-mode");
      }
    };

   
    const toggleSidebar = () => {
      nav.classList.toggle("active");
    };

    const handleBodyClick = (e) => {
      let clickedElm = e.target;
      if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
      }
    };

    modeToggle.addEventListener("click", toggleMode);
   
    sidebarOpen.addEventListener("click", toggleSidebar);
    body.addEventListener("click", handleBodyClick);

    // Clean up event listeners on component unmount
    return () => {
      modeToggle.removeEventListener("click", toggleMode);
    
      sidebarOpen.removeEventListener("click", toggleSidebar);
      body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <>
      <nav>
        <div className="nav-bar">
          <i className='bx bx-menu sidebarOpen'></i>
          <span className="logo navLogo" s><a href="#">Naukri Hub</a></span>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="darkLight-searchBox">
          <div className="dark-light">
            <i className='bx bx-moon moon'></i>
            <i className='bx bx-sun sun'></i>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default Header;
