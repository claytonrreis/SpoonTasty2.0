import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import "./navBar.css";

function NavBar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="nav">
      <Link to="/" className="siteTitle">
        SpoonTasty <i className="fa-solid fa-spoon"></i>
      </Link>
      <div className="menu-container">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          aria-label="Toggle navigation menu"
        />
        {isOpen && (
          <ul className="dropdown-menu" aria-label="Navigation menu">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
