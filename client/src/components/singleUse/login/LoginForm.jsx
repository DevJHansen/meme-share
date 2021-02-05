import React, { useState } from "react";

import Colors from "../../../config/colors";

import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser, login } from "../../../actions/authActions";

import { APIURL } from "../../../config/vars";

import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Link from "../../UI/Link";
import Loading from "../../UI/Loading";

import colors from "../../../config/colors";
import globalStyles from "../../../config/globalStyles";

import { store } from "react-notifications-component";

export const LoginHeader = () => {
  return (
    <div style={styles.header}>
      <b>MEME SHARE</b>
    </div>
  );
};

export const LoginFooter = () => {
  return (
    <div style={styles.link}>
      <Link style={styles.linkBtn} to="/">
        <Button
          style={{ ...styles.footerBtn, backgroundColor: Colors.secondary }}
          title="Home"
        />
      </Link>
      <Link style={styles.linkBtn} to="/signup">
        <Button
          style={{ ...styles.footerBtn, backgroundColor: Colors.tertiary }}
          title="Sign Up"
        />
      </Link>
    </div>
  );
};

const LoginForm = (props) => {
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

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

    if (password.length < 6) {
      setLoading(false);
      setPasswordError(true);
      store.addNotification({
        title: "Error!",
        message: "Password must be at least 6 characters",
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
      password: password,
    };

    setLoading(true);

    axios
      .post(`${APIURL}auth/login`, body)
      .then((res) => {
        setEmail("");
        setPassword("");
        dispatch(login(res.data.token));
        dispatch(loadUser());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setEmailError(true);
        setPasswordError(true);
        store.addNotification({
          title: "Error!",
          message: "Invalid Credentials",
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
      <form onSubmit={handleLogin} style={styles.form}>
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
          value={password}
          required
          onChange={handlePasswordChange}
          type="password"
          placeholder="Password"
          style={
            passwordError
              ? { ...styles.input, ...globalStyles.errorValidation }
              : styles.input
          }
        />

        {loading ? (
          <Loading />
        ) : (
          <Button style={styles.button} type="submit" title="Login" />
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
    color: colors.primary,
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
};

export default LoginForm;
