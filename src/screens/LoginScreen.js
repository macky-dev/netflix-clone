import React, { useState } from "react";
import styles from "./LoginScreen.module.css";
import SignupScreen from "./SignupScreen";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginScreen__background}>
        <img
          className={styles.loginScreen__logo}
          src={"/images/netflix-logo.png"}
          alt="logo"
        />
        <button
          className={styles.loginScreen__button}
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>
        <div className={styles.loginScreen__gradient}></div>
      </div>

      <div className={styles.loginScreen__body}>
        {signIn ? (
          <SignupScreen />
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className={styles.loginScreen__input}>
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  className={styles.loginScreen__getStarted}
                  onClick={() => setSignIn(true)}
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
