import React from "react";
import "./GetStarted.css";
import { FaMicrochip, FaSatelliteDish, FaTools } from "react-icons/fa";

const SPECIALTIES = [
  { Icon: FaMicrochip, label: "Embedded systems" },
  { Icon: FaSatelliteDish, label: "IoT and connectivity" },
  { Icon: FaTools, label: "Hardware prototyping" },
];

const GetStarted = () => {
  return (
    <section id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <header className="g-header">
          <p className="g-eyebrow">Focus</p>
          <h2 className="g-heading primaryText">We specialise in</h2>
          <p className="g-lede secondaryText">
            Firmware, sensors, and field-ready devices: from first schematic to
            pilot deployments, with clear documentation and maintainable code.
          </p>
        </header>

        <ul className="g-specialties" role="list">
          {SPECIALTIES.map(({ Icon, label }) => (
            <li key={label} className="g-specialty">
              <div className="g-specialty-icon-wrap" aria-hidden>
                <Icon className="g-specialty-icon" />
              </div>
              <span className="g-specialty-label">{label}</span>
            </li>
          ))}
        </ul>

        <p className="g-tagline secondaryText">
          We take on demanding technical problems and ship outcomes you can
          rely on, whether you need a proof of concept or a path to production.
        </p>

        <a className="button g-cta" href="mailto:zainkeepscode@gmail.com">
          Get started
        </a>
      </div>
    </section>
  );
};

export default GetStarted;
