import React from "react";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container">

        {/* Logo */}
        <a className="navbar-brand logo" href="/">
          🍔 BiteRush
        </a>

        {/* Right Side Links */}
        <div className="d-flex align-items-center gap-3">

          <a className="nav-link text-white">
            HOME
          </a>

          <a className="nav-link text-white" href="/products">
            PRODUCTS
          </a>

          <a className="nav-link text-white" href="/types">
            TYPES
          </a>


          <a className="nav-link text-white" href="/contact">
            CONTACT US
          </a>

          {/* Login Popup Button */}
          <button
            className="btn btn-light login-btn"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Login
          </button>

          {/* Signup Button */}
         <button
          className="btn btn-dark signup-btn"
          data-bs-toggle="modal"
          data-bs-target="#signupModal"
        >
          Signup
        </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;