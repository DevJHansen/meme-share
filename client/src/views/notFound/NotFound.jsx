import React from "react";

import Colors from "../../config/colors";

import Button from "../../components/UI/Button";
import Link from "../../components/UI/Link";

const NotFound = () => {
  return (
    <div style={styles.main}>
      <h1 style={styles.heading}>404</h1>
      <h4 style={styles.text}>
        Oops, we can't seem to find the page you're looking for.
      </h4>
      <Link style={styles.linkBtn} to="/">
        <Button style={styles.btn} title="Go Home" />
      </Link>
    </div>
  );
};

const styles = {
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.text,
    textAlign: "center",
  },
  heading: {
    color: Colors.accent,
    fontSize: 102,
    lineHeight: 0,
  },
  text: {
    color: "#f1f1f1",
    margin: 10,
    marginBottom: 40,
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    backgroundColor: "transparent",
    color: Colors.primary,
    border: `1px solid ${Colors.primary}`,
    boxShadow: "none",
  },
};

export default NotFound;
