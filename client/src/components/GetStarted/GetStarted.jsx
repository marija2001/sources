import React from "react";
import "./GetStarted.css";
import { FaMicrochip, FaSatelliteDish, FaTools } from "react-icons/fa";

const GetStarted = () => {
    return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">We specialise in</span>

          {/* Ikonice sa nazivima */}
          <div className="specialties">
            <div className="specialty">
              <FaMicrochip size={40} color="#2cb1bc" />
              <span className="specialty-text">Embedded Systems</span>
            </div>
            <div className="specialty">
              <FaSatelliteDish size={40} color="#2cb1bc" />
              <span className="specialty-text">IoT Devices</span>
            </div>
            <div className="specialty">
              <FaTools size={40} color="#2cb1bc" />
              <span className="specialty-text">Hardware Prototyping</span>
            </div>
          </div>

         
          <span className="secondaryText">
           Solutions that write the future.
            <br />
            We’re excited by new challenges and diverse projects — always eager to learn, grow, and push boundaries.
          </span>
          <button className="button">
            <a href="mailto:zainkeepscode@gmail.com">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
