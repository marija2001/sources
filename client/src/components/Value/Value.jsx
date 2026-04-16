import React from "react";
import { Link } from "react-router-dom";
import "./Value.css";
import "./ValueMore.css";

const visionImg = "/programming.jpg";
const missionImg = "/programmingg.jpg";
const teamImg = "/programming.jpg";

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

        <div className="v-more">
          <div className="v-more__collab">
            <div className="v-more__collab-inner">
              <p className="v-more__eyebrow">Collaboration</p>
              <h2 className="v-more__title">
                We build alongside your company
              </h2>
              <p className="v-more__text">
                If you have a product idea, a pilot scope, or a problem that needs
                firmware and hardware—not slides—we can partner on it end to end.
                You keep ownership of the vision; we help with architecture,
                implementation, and getting it to a shippable state.
              </p>
              <Link className="button v-more__cta" to="/services">
                View services
              </Link>
            </div>
          </div>

          <div className="v-more__team">
            <div className="flexColStart v-more__team-copy">
              <p className="v-more__eyebrow">Team</p>
              <h2 className="v-more__title">Meet our team</h2>
              <p className="v-more__text">
                Engineers who split time between the bench, the codebase, and
                clear communication with your stakeholders. Full profiles and roles
                live on a dedicated page—swap the photo here when you have a group
                shot or brand image.
              </p>
              <Link className="button v-more__cta" to="/team">
                Meet everyone
              </Link>
            </div>
            <div className="v-more__team-media">
              <div className="image-stack image-stack--end">
                <span className="image-stack__shadow" aria-hidden />
                <div className="image-container">
                  <img
                    src={teamImg}
                    alt="Team — replace with a group photo when ready"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
