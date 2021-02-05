import React, { useState } from "react";

import Colors from "../../../config/colors";

import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser, login } from "../../../actions/authActions";

import globalStyles from "../../../config/globalStyles";

import { APIURL } from "../../../config/vars";

import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Link from "../../UI/Link";
import Loading from "../../UI/Loading";

import { store } from "react-notifications-component";

export const SignUpHeader = () => {
  return (
    <div style={styles.header}>
      <b>MEME SHARE</b>
    </div>
  );
};

export const SignUpFooter = () => {
  return (
    <div style={styles.link}>
      <Link style={styles.linkBtn} to="/login">
        <Button
          style={{ ...styles.footerBtn, backgroundColor: Colors.tertiary }}
          title="Login"
        />
      </Link>
    </div>
  );
};

const SignUpForm = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfrimPasswordError] = useState(false);

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setEmailError(false);
    setNameError(false);
    setPasswordError(false);
    setConfrimPasswordError(false);

    const re = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!re.test(email)) {
      setLoading(false);
      setEmailError(true);
      store.addNotification({
        title: "Error!",
        message: "Please enter a valid email address",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    const checkEmail = await axios.post(`${APIURL}check/email`, {
      email: email.toLowerCase(),
    });

    if (!checkEmail.data.success) {
      setEmailError(true);
      setLoading(false);
      store.addNotification({
        title: "Error!",
        message: "Email already in use",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    if (name.length < 1) {
      setNameError(true);
      setLoading(false);
      store.addNotification({
        title: "Error!",
        message: "Please enter your name",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      setLoading(false);
      store.addNotification({
        title: "Error!",
        message: "Passwords needs to be at least 6 characters",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfrimPasswordError(true);
      setLoading(false);
      store.addNotification({
        title: "Error!",
        message: "Passwords do not match",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    const body = {
      email: email.toLowerCase(),
      name: name,
      password: password,
    };

    axios
      .post(`${APIURL}auth/register`, body)
      .then((res) => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        dispatch(login(res.data.token));
        dispatch(loadUser());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        store.addNotification({
          title: "Error!",
          message: "Oops... Something went wrong. Please try again",
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };

  return (
    <div>
      <form onSubmit={handleSignUp} style={styles.form}>
        <Input
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder="Email"
          style={
            emailError
              ? { ...styles.input, ...globalStyles.errorValidation }
              : styles.input
          }
        />
        <Input
          value={name}
          min={2}
          onChange={handleNameChange}
          type="text"
          placeholder="Name"
          style={
            nameError
              ? { ...styles.input, ...globalStyles.errorValidation }
              : styles.input
          }
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="Password"
          style={
            passwordError
              ? { ...styles.input, ...globalStyles.errorValidation }
              : styles.input
          }
        />
        <Input
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          placeholder="Confirm Password"
          style={
            confirmPasswordError
              ? { ...styles.input, ...globalStyles.errorValidation }
              : styles.input
          }
        />
        {loading ? (
          <Loading />
        ) : (
          <Button style={styles.button} type="submit" title="Sign Up" />
        )}
      </form>
    </div>
  );
};

const styles = {
  button: {
    margin: 5,
    width: "100%",
    backgroundColor: Colors.primary,
  },
  input: {
    margin: 5,
    width: "100%",
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  linkText: {
    fontSize: 12,
    margin: 4,
    color: "#f1f1f1",
  },
  header: {
    color: Colors.primary,
    fontSize: 32,
    fontFamily: globalStyles.titleFont,
  },
  link: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  linkBtn: {
    marginLeft: 2,
    marginRight: 2,
    width: "100%",
  },
  footerBtn: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },
  roleBtn: {
    padding: 5,
    width: "80px",
    margin: "2px",
    border: "none",
    borderRadius: globalStyles.borderRadius,
    boxShadow: globalStyles.boxShadow,
  },
};

export default SignUpForm;
