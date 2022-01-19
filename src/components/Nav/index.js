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
          src={"/images/netflix-logo.png"}
          alt="logo"
        />
        <img
          onClick={() => navigate("/profile")}
          className={styles.nav__avatar}
          src={"/images/avatar.png"}
          alt="user-avatar"
        />
      </div>
    </div>
  );
};

export default Nav;
