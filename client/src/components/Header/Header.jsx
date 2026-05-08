import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <section className="h-wrapper">
      <div className="innerWidth paddings h-container">
        <Link to="/">
          <img src="/logorem.png" alt="Sources" width={100} />
        </Link>

        <div className="h-end">
          <OutsideClickHandler
            onOutsideClick={() => {
              setMenuOpened(false);
            }}
          >
            <div
              className={`h-menu${menuOpened ? " h-menu--open" : ""}`}
            >
              <NavLink to="/projects" onClick={() => setMenuOpened(false)}>
                Projects
              </NavLink>
              <NavLink to="/services" onClick={() => setMenuOpened(false)}>
                Services
              </NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpened(false)}>
                Contact
              </NavLink>
              <NavLink to="/team" onClick={() => setMenuOpened(false)}>
                About us
              </NavLink>
            </div>
          </OutsideClickHandler>

          <div className="h-bar-actions">
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
