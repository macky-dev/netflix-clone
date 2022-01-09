import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Nav = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`${styles.nav} ${showNav && styles.nav_black}`}>
      <div className={styles.nav__contents}>
        <img
          onClick={() => navigate("/")}
          className={styles.nav__logo}
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="logo"
        />
        <img
          onClick={() => navigate("/profile")}
          className={styles.nav__avatar}
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt="user-avatar"
        />
      </div>
    </div>
  );
};

export default Nav;
