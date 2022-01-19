import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { selectUser } from "../store/userSlice";

import styles from "./ProfileScreen.module.css";
import Nav from "../components/Nav";
import PlansScreen from "./PlansScreen";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className={styles.profileScreen}>
      <Nav />
      <div className={styles.profileScreen__body}>
        <h1>Edit Profile</h1>
        <div className={styles.profileScreen__info}>
          <img src={"/images/avatar.png"} alt="profile" />
          <div className={styles.profileScreen__details}>
            <h2>{user.email}</h2>
            <div className={styles.profileScreen__plans}>
              <h3>Plans</h3>
              <PlansScreen />
              <button
                className={styles.profileScreen__signout}
                onClick={signOut}
              >
                Signout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
