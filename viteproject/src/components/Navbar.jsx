import React from "react";
import  { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import {checkIsUserLoggedIn} from "../utils/utils";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    checkIsUserLoggedIn()
);

  // Logout function
      const handleLogout = () => {
        try {
          // 1. Clear localStorage
          localStorage.removeItem("userData");
          localStorage.removeItem("token");

          // 3. Update auth state
          setIsLoggedIn(false);

          // 4. Redirect to home
          navigate("/");              // if using React Router

          // 5. Optional: show success toast
          toast.success("Logged out successfully!");

        } catch (error) {
          console.error("Logout failed:", error);
          // toast.error("Something went wrong during logout.");
        }
      };




  return (
    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container">

        {/* Logo */}
        <a className="navbar-brand logo" href="/">
          🍔 BiteRush
        </a>

        {/* Right Side Links */}
        <div className="d-flex align-items-center gap-3">

          <a className="nav-link text-white" href="/home">
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
          {
            isLoggedIn &&
            <a className="nav-link text-white" href="/orders">
              MY ORDERS
            </a> 
          }

          <div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              My Account
              </button>

              <ul className="dropdown-menu">
              
                  <li>
                       { 
                        isLoggedIn &&
                         <div>
                          <button className="btn btn-light login-btn dropdown-item" onClick={handleLogout}> Profile </button>
                          <button className="btn btn-light login-btn dropdown-item" onClick={handleLogout}> Dashboard </button>
                          <button className="btn btn-light login-btn dropdown-item" onClick={handleLogout}> Settings </button>
                          <button className="btn btn-light login-btn dropdown-item" onClick={handleLogout}> Manage Address </button>
                          <button className="btn btn-light login-btn dropdown-item" onClick={handleLogout}> Notifications </button>
                          <button className="btn btn-light login-btn dropdown-item" onClick={handleLogout}> Manage Account </button>
                          <button className="btn btn-danger login-btn dropdown-item text-red" onClick={handleLogout}> Logout </button>
                         </div>
                       }
                  </li>

                  <li>
                      {
                        !isLoggedIn &&
                        <button
                        className="btn btn-light login-btn dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                      >
                        Login
                      </button>
                      }
                    </li>

                    <li>
                      {
                        !isLoggedIn && 
                      
                          <button
                            className="btn btn-dark signup-btn dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#signupModal"
                          >
                            Signup
                          </button>
                      }
                    </li>
               
              </ul>
            </div>
          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;