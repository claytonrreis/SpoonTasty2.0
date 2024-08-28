import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import Logout from "../../pages/Logout";
import "./nBLogged.css";

function NavBar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="nav">
      <Link to="#" className="siteTitle">
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
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/spoonerglist" onClick={() => setOpen(false)}>
                Grocery Lists
              </Link>
            </li>
            <li>
              <Link to="/recipes" onClick={() => setOpen(false)}>
                Recipes
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
