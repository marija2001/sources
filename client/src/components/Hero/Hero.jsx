import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
//import SearchBar from "../SearchBar/SearchBar";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            >
              Engineering <br />
              a better world
              <br /> 
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Innovating embedded systems and IoT solutions </span>
            <span>Empowering your projects with cutting-edge embedded and IoT technologies</span>
          </div>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={4} end={8} duration={2} /> <span>+</span>
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

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="./home3.jpg" alt="source" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
