import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddProjectModal from "../AddProjectModal/AddProjectModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { toggleTheme } = useTheme();
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();


  const handleAddProjectClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };
  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="./logorem.png" alt="logo" width={100} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/projects">Projects</NavLink>

            <a href="/#contact-us" onClick={() => setMenuOpened(false)}>Contact</a>
            <a href="/#about-us" onClick={() => setMenuOpened(false)}>About us </a>
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
            {/* <div onClick={handleAddProjectClick}>Add project</div>
            <AddProjectModal opened={modalOpened} setOpened={setModalOpened} /> */}
            {/* {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )} */}
          </div>
        </OutsideClickHandler>

        <div className="h-bar-actions">
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
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
    </section>
  );
};

export default Header;
