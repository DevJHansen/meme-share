import React from "react";

import Colors from "../../config/colors";

import globalStyles from "../../config/globalStyles";

const Button = (props) => {
  return (
    <button
      className="button"
      style={{ ...styles.button, ...props.style }}
      onClick={props.handlePress}
    >
      {props.title}
    </button>
  );
};

const styles = {
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: "white",
    backgroundColor: Colors.primary,
    border: "none",
    fontSize: 16,
    borderRadius: globalStyles.borderRadius,
    cursor: "pointer",
    outline: "none",
    boxShadow: globalStyles.boxShadow,
  },
};

export default Button;
