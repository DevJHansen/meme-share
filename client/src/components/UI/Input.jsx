import React from "react";
import colors from "../../config/colors";
import globalStyles from "../../config/globalStyles";

const Input = (props) => {
  return <input {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = {
  input: {
    borderRadius: globalStyles.borderRadius,
    border: "none",
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    outline: "none",
    fontSize: 16,
    color: colors.text,
    boxSizing: "border-box",
    boxShadow: globalStyles.boxShadow,
  },
};

export default Input;
