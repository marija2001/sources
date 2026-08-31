import React from "react";
import { Link } from "react-router-dom";
import "./Value.css";
import "./ValueMore.css";

const ABOUT_COLLAGE = [
  {
    src: "/about_us/ploca.jpg",
    alt: "Hands-on PCB assembly and hardware development",
    className: "v-about__collage-cell--pcb",
  },
  {
    src: "/about_us/zene.jpg",
    alt: "Engineers reviewing firmware and test hardware",
    className: "v-about__collage-cell--team",
  },
  {
    src: "/about_us/kancelarija.jpg",
    alt: "Modern office workspace",
    className: "v-about__collage-cell--office",
  },
];

const missionImg = "/about_us/kanc.jpg";
const teamImg = "/programmingg.jpg";

const Value = () => {
  return (
    <section id="about-us" className="v-wrapper">
      <div className="paddings innerWidth v-about">
        <div className="v-about__hero">
          <div className="v-about__collage" aria-hidden="false">
            {ABOUT_COLLAGE.map(({ src, alt, className }) => (
              <figure
                key={src}
                className={`v-about__collage-cell ${className}`}
              >
                <img src={src} alt={alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <div className="v-about__intro">
            <p className="eyebrow">About us</p>
            <h2 className="heading-2 v-about__heading">Our vision</h2>
            <p className="secondaryText v-about__text">
              We want to help companies turn ideas into reliable connected
              products and monitoring systems that work in real-world conditions
              and remain easy to maintain over time.
            </p>
          </div>
        </div>

        <div className="v-about__row">
          <div className="flexColStart v-about__copy">
            <h2 className="heading-2 v-about__heading">Our mission</h2>
            <p className="secondaryText v-about__text">
              We design and build embedded devices, firmware, edge software, and
              connected monitoring systems, from the first prototype to field
              deployment.
              <br />
              We work closely with our clients throughout the development process
              and coordinate specialized partners when additional hardware,
              mechanical, or cloud expertise is required.
            </p>
          </div>
          <div className="v-about__media v-about__media--mission">
            <div className="media-frame">
              <img
                src={missionImg}
                alt="Electronics lab and prototyping workspace"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="v-more">
          <div className="v-more__collab">
            <div className="v-more__collab-inner v-more__collab-inner--rail">
              <p className="eyebrow">Collaboration</p>
              <h2 className="heading-2 v-more__title">
              From prototype to production
              </h2>
              <p className="v-more__text">
              We work closely with your team throughout development, testing, documentation, 
              and manufacturing support, so the product is easy to maintain and improve.
              </p>
              <Link className="v-more__cta" to="/services">
                View services
              </Link>
            </div>
          </div>

          <div className="v-more__team">
            <div className="v-more__team-media">
              <div className="media-frame">
                <img
                  src={teamImg}
                  alt="Team group photo"
                />
              </div>
            </div>
            <div className="flexColStart v-more__team-copy">
              <p className="eyebrow">Team</p>
              <h2 className="heading-2 v-more__title">Our team</h2>
              <p className="v-more__text">
              Meet the engineers behind our products and solutions.

              </p>
              <Link className="v-more__cta" to="/team">
                Meet everyone
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
