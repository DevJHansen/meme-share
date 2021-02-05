import React from "react";

import colors from "../../config/colors";

import MenuBtn from "../UI/MenuBtn";

const Navbar = (props) => {
  return (
    <nav style={{ ...styles.nav, ...props.style }}>
      <div>
        <MenuBtn onClick={props.onClick} />
      </div>
      <div style={{ ...styles.middle, ...props.middleStyle }}>
        {props.middle}
      </div>
      <div>{props.right}</div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100vw",
    backgroundColor: colors.primary,
    height: 56,
    top: 0,
    left: 0,
    position: "fixed",
    zIndex: 50,
  },
};

export default Navbar;
