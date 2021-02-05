import React from "react";

const Backdrop = (props) => {
  return <div style={styles.backdrop} onClick={props.onClick} />;
};

const styles = {
  backdrop: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    background: "rgba(0,0,0,0.4)",
    zIndex: 100,
    top: 0,
    left: 0,
  },
};

export default Backdrop;
