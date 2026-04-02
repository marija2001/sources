import React from "react";
import "./Value.css";

const visionImg = "/programming.jpg";
const missionImg = "/programmingg.jpg";

const Value = () => {
  return (
    <section id="value" className="v-wrapper">
      <div className="paddings innerWidth v-about">
        <div className="v-about__row">
          <div className="v-about__media">
            <div className="image-stack image-stack--shadow-left">
              <span className="image-stack__shadow" aria-hidden />
              <div className="image-container">
                <img
                  src={visionImg}
                  alt="Engineering workspace and embedded development"
                />
              </div>
            </div>
          </div>
          <div className="flexColStart v-about__copy">
            <span id="about-us" className="orangeText">
              ABOUT US
            </span>
            <h2 className="primaryText v-about__heading">Our vision</h2>
            <p className="secondaryText v-about__text">
              We want product teams to ship embedded systems with confidence—from
              first schematic through manufacturing and years in the field. That
              means predictable timelines, designs you can maintain, and a partner
              who stays engaged after the board is spun.
            </p>
          </div>
        </div>

        <div className="v-about__row">
          <div className="flexColStart v-about__copy">
            <h2 className="primaryText v-about__heading">Our mission</h2>
            <p className="secondaryText v-about__text">
              We combine hands-on hardware and firmware work with clear
              communication: tight bring-up loops, honest risk calls, and
              documentation that the next engineer can pick up. Your roadmap stays
              yours; we help execute it without drama.
            </p>
          </div>
          <div className="v-about__media">
            <div className="image-stack image-stack--end">
              <span className="image-stack__shadow" aria-hidden />
              <div className="image-container">
                <img
                  src={missionImg}
                  alt="Hardware and software integration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
