import React from "react";
import colors from "../../config/colors";

const TextArea = (props) => {
  return <textarea {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = {
  input: {
    borderRadius: 20,
    border: "none",
    height: 120,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    outline: "none",
    fontSize: 16,
    color: colors.text,
    boxSizing: "border-box",
  },
};

export default TextArea;
