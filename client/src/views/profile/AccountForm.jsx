import React, { useState, useEffect } from "react";

import axios from "axios";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Loading from "../../components/UI/Loading";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/authActions";

import colors from "../../config/colors";
import globalStyles from "../../config/globalStyles";
import { APIURL } from "../../config/vars";

import { store } from "react-notifications-component";

const PublisherAccount = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    []
  );

  useEffect(() => {
    setEmail(auth.auth.user.email);
  }, [auth.auth.user.email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const updateEmail = async () => {
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

    if (email === auth.auth.user.eamil) {
      setLoading(false);
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

    const body = {
      email,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${auth.auth.token}`,
      },
    };

    axios
      .put(`${APIURL}auth/updatedetails`, body, config)
      .then((res) => {
        dispatch(loadUser());
        setLoading(false);
        setEmailError(false);
        store.addNotification({
          title: "Success!",
          message: "Your email has been updated",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      })
      .catch((err) => {
        setEmailError(true);
        setLoading(false);
        store.addNotification({
          title: "Error!",
          message:
            "Oops. Something went wrong updating your email. Please try again",
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

  const updatePassword = () => {
    if (password.length < 6) {
      setPasswordError(true);
      setLoading(false);
      store.addNotification({
        title: "Error!",
        message: "Password needs to be at least 6 characters",
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

    if (newPassword.length < 6) {
      setNewPasswordError(true);
      setLoading(false);
      store.addNotification({
        title: "Error!",
        message: "New password needs to be at least 6 characters",
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

    if (newPassword !== confirmPassword) {
      setNewPasswordError(true);
      setConfirmPasswordError(true);
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
      newPassword: newPassword,
      currentPassword: password,
      id: auth.auth.user._id,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${auth.auth.token}`,
      },
    };

    axios
      .put(`${APIURL}auth/updatepassword`, body, config)
      .then((res) => {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError(false);
        setNewPasswordError(false);
        setConfirmPasswordError(false);
        setLoading(false);
        store.addNotification({
          title: "Success!",
          message: "Your password has been updated",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      })
      .catch((err) => {
        setPasswordError(true);
        setLoading(false);
        store.addNotification({
          title: "Error!",
          message:
            "Oops... There was an error updating your password. Please ensure you used the correct password",
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

  const handleUpdate = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setNewPasswordError(false);
    setConfirmPasswordError(false);
    if (email !== auth.auth.user.email && !newPassword) {
      setLoading(true);
      updateEmail();
    }

    if (email === auth.auth.user.email && newPassword) {
      setLoading(true);
      updatePassword();
    }

    if (email !== auth.auth.user.email && newPassword) {
      setLoading(true);
      updatePassword();
      updateEmail();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Account Details</h2>
        <h4 style={styles.name}>{auth.auth.user.name}</h4>
        <form onSubmit={handleUpdate}>
          {auth.auth.user.email === "demo@gmail.com" ||
          auth.auth.user.email === "user@gmail.com" ? (
            <p style={globalStyles.hint}>
              We don't allow email and password updates for demo accounts.
            </p>
          ) : null}
          <Input
            disabled={
              auth.auth.user.email === "demo@gmail.com" ||
              auth.auth.user.email === "user@gmail.com"
                ? true
                : false
            }
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
            disabled={
              auth.auth.user.email === "demo@gmail.com" ||
              auth.auth.user.email === "user@gmail.com"
                ? true
                : false
            }
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
            disabled={
              auth.auth.user.email === "demo@gmail.com" ||
              auth.auth.user.email === "user@gmail.com"
                ? true
                : false
            }
            value={newPassword}
            onChange={handleNewPasswordChange}
            type="password"
            placeholder="New password"
            style={
              newPasswordError
                ? { ...styles.input, ...globalStyles.errorValidation }
                : styles.input
            }
          />
          <Input
            disabled={
              auth.auth.user.email === "demo@gmail.com" ||
              auth.auth.user.email === "user@gmail.com"
                ? true
                : false
            }
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type="password"
            placeholder="Confrim password"
            style={
              confirmPasswordError
                ? { ...styles.input, ...globalStyles.errorValidation }
                : styles.input
            }
          />

          {loading ? (
            <div style={styles.loading}>
              <Loading />
            </div>
          ) : (
            <Button
              style={
                !password && email === auth.auth.user.email
                  ? styles.disabledButton
                  : styles.button
              }
              type="submit"
              title="Save"
            />
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 10,
    paddingTop: 46,
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  content: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontFamily: globalStyles.titleFont,
    color: colors.secondary,
  },
  name: {
    color: colors.accent,
  },
  input: {
    margin: 5,
    width: "100%",
  },
  button: {
    margin: 5,
    width: "100%",
    backgroundColor: colors.primary,
  },
  disabledButton: {
    margin: 5,
    width: "100%",
    backgroundColor: "grey",
    cursor: "auto",
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  sidebarBtn: {
    boxShadow: "none",
  },
};

export default PublisherAccount;
