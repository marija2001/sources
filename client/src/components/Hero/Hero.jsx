import { useEffect, useState } from "react";
import "./Hero.css";
import CountUp from "react-countup";

const LEARN_MORE_TEXT = "Learn more";
const TYPE_MS = 95;
const DELETE_MS = 55;
const PAUSE_FULL_MS = 1800;
const PAUSE_EMPTY_MS = 700;

const HERO_PENCILS = [
  { key: "short", label: "Firmware & BSP" },
  { key: "mid", label: "Board bring-up" },
  { key: "long", label: "Drivers & integration" },
];

const Hero = ({ pencilAnimEpoch = 1, onLearnMoreClick }) => {
  const [typedLen, setTypedLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting && typedLen < LEARN_MORE_TEXT.length) {
      const t = window.setTimeout(() => setTypedLen((n) => n + 1), TYPE_MS);
      return () => window.clearTimeout(t);
    }
    if (!deleting && typedLen === LEARN_MORE_TEXT.length) {
      const t = window.setTimeout(() => setDeleting(true), PAUSE_FULL_MS);
      return () => window.clearTimeout(t);
    }
    if (deleting && typedLen > 0) {
      const t = window.setTimeout(() => setTypedLen((n) => n - 1), DELETE_MS);
      return () => window.clearTimeout(t);
    }
    if (deleting && typedLen === 0) {
      const t = window.setTimeout(() => setDeleting(false), PAUSE_EMPTY_MS);
      return () => window.clearTimeout(t);
    }
  }, [typedLen, deleting]);

  return (
    <section className="hero-wrapper">
      <div className="hero-canvas" aria-hidden>
        <div className="hero-canvas__solid" />
      </div>

      <div className="hero-inner paddings innerWidth">
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 className="hero-headline">Embedded systems that ship</h1>
            <p className="hero-tagline hero-tagline--on-dark">
              From first schematic to devices in the field.
            </p>
            <div className="flexStart hero-stats stats">
              <div className="flexColStart stat">
                <span className="stat-value">
                  <CountUp start={4} end={10} duration={2} />{" "}
                  <span className="stat-plus">+</span>
                </span>
                <span className="secondaryText stat-label">
                  Years of experience
                </span>
              </div>
              <div className="flexColStart stat">
                <span className="stat-value">
                  <CountUp start={10} end={20} duration={4} />{" "}
                  <span className="stat-plus">+</span>
                </span>
                <span className="secondaryText stat-label">Clients</span>
              </div>
              <div className="flexColStart stat">
                <span className="stat-value">
                  <CountUp end={3} duration={2} />{" "}
                  <span className="stat-plus">+</span>
                </span>
                <span className="secondaryText stat-label">Engineers</span>
              </div>
            </div>
            <a
              className="hero-learn-more hero-learn-more--on-dark"
              href="#about-us"
              aria-label="Learn more, about us"
              onClick={(e) => {
                if (!onLearnMoreClick) return;
                e.preventDefault();
                onLearnMoreClick();
              }}
            >
              <span className="hero-learn-more__text">
                {LEARN_MORE_TEXT.slice(0, typedLen)}
              </span>
              <span className="hero-learn-more__cursor" aria-hidden>
                |
              </span>
            </a>
          </div>

        </div>
      </div>

      <div
        key={pencilAnimEpoch}
        className="hero-pencils"
        aria-label="Services"
      >
        {HERO_PENCILS.map((item, i) => (
          <div
            key={item.key}
            className={`hero-pencil hero-pencil--${item.key}`}
            style={{ "--hero-pencil-i": String(i) }}
          >
            <div className="hero-pencil__shape-wrap">
              <div className="hero-pencil__shape">
                <span className="hero-pencil__text">{item.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
