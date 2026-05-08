import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth f-container">
        <div className="f-logo">
          <img src="./logo3.png" alt="" width={120} />
        </div>

        <div className="flexColStart f-copy">
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Mila Perunicica I/28
            <br/>
            Pljevlja 84210
            <br/>
            ME</span>
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
