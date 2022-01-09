import React, { useRef } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./SignupScreen.module.css";

const SignupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value,
    )
      .then((user) => {
        console.log(user);
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value,
    )
      .then((user) => {
        console.log(user);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={styles.signupScreen}>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className={styles.signupScreen__gray}>New to Netflix?</span>{" "}
          <span className={styles.signupScreen__link} onClick={register}>
            Sign Up Now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;
