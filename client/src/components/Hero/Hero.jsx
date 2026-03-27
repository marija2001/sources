import "./Hero.css";
import CountUp from "react-countup";
import ProductShowcase from "../ProductShowcase/ProductShowcase";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <ProductShowcase />
      <div className="paddings innerWidth hero-stats-band">
        <p className="hero-stats-intro secondaryText">
          Embedded systems and IoT — from first prototype to products in the field.
        </p>
        <div className="flexCenter stats">
          <div className="flexColCenter stat">
            <span>
              <CountUp start={4} end={10} duration={2} /> <span>+</span>
            </span>
            <span className="secondaryText">Years of experience</span>
          </div>

          <div className="flexColCenter stat">
            <span>
              <CountUp start={10} end={20} duration={4} /> <span>+</span>
            </span>
            <span className="secondaryText">Clients</span>
          </div>

          <div className="flexColCenter stat">
            <span>
              <CountUp end={3} /> <span>+</span>
            </span>
            <span className="secondaryText">Engineers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
