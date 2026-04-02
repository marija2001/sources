import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const logoSrc =
    theme === "dark" ? "/logorem-dark.png" : "/logorem.png";
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <section className="h-wrapper">
      <div className="innerWidth paddings h-container">
        <Link to="/">
          <img src={logoSrc} alt="Sources" width={100} />
        </Link>

        <div className="h-end">
          <OutsideClickHandler
            onOutsideClick={() => {
              setMenuOpened(false);
            }}
          >
            <div className="h-menu" style={getMenuStyles(menuOpened)}>
              <NavLink to="/projects">Projects</NavLink>
              <a href="/#contact-us" onClick={() => setMenuOpened(false)}>
                Contact
              </a>
              <a href="/#about-us" onClick={() => setMenuOpened(false)}>
                About us
              </a>
            </div>
          </OutsideClickHandler>

          <div className="h-bar-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => {
                toggleTheme();
                setMenuOpened(false);
              }}
            >
              Theme
            </button>
            <div
              className="menu-icon"
              onClick={() => setMenuOpened((prev) => !prev)}
            >
              <BiMenuAltRight size={30} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
