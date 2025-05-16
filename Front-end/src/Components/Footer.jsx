import React from 'react'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Echoes Of Soul</h3>
        <p>Let every word echo your heart. Discover, feel, and connect through the art of poetry.</p>
        {/* <div className="socials">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Echoes Of Soul | All rights reserved</p>
      </div>
    </footer>
  );
}
