import React from "react";
import { Link } from "react-router-dom";
import Colors from "../../config/colors";

const CustomLink = (props) => {
  return (
    <Link style={{ ...styles.link, ...props.style }} to={props.to}>
      {props.children}
    </Link>
  );
};

const styles = {
  link: {
    color: Colors.text,
    textDecoration: "none",
  },
};

export default CustomLink;
