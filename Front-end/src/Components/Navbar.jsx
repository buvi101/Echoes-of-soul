import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <img src="logo.png" alt="logo" />

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </>
        )}
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''} onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/mypoems" className={location.pathname === '/mypoems' ? 'active' : ''} onClick={closeMenu}>My Poems</Link>
          </li>
        )}
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <button onClick={() => { logout({ logoutParams: { returnTo: window.location.origin } }); closeMenu(); }}>
              Log Out
            </button>
          ) : (
            <button onClick={() => { loginWithRedirect(); closeMenu(); }}>
              Log In
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
