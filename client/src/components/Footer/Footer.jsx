import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth f-container">
        <div className="f-logo">
          <img src="/logo3.png" alt="Sources" width={120} />
        </div>

        <div className="flexColStart f-copy">
          <span className="secondaryText">
          Our vision is to use technology to improve <br/>
          the way people live, work, and connect.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText f-address">
            <strong>Pljevlja</strong>
            <br />
            Mila Perunicica I/28
            <br />
            84210, ME
          </span>
          <span className="secondaryText f-address">
            <strong>Podgorica</strong>
            <br />
            81000, ME
          </span>
        </div>

        <nav className="f-menu" aria-label="Footer links">
          <span>Projects</span>
          <span>Services</span>
          <span>Product</span>
          <span>About Us</span>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
