import React from "react";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          {/* Logo and Description */}
          <div className="col-md-4 mb-4">
            <h3 className="footer-logo">🍔 BiteRush</h3>

            <p className="footer-text">
              Delicious food❤️ delivered to your doorstep🔥
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>

            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/types">Types</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5>Contact</h5>

            <p>Email: shalemrajubiraja7@gmail.com</p>
            <p>Phone: +91 9347796191</p>
          </div>

        </div>

        {/* Bottom Line */}
        <hr />

        <p className="text-center copyright">
          © 2026 BiteRush. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;