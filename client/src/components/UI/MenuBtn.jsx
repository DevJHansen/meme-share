import React from "react";

const MenuBtn = (props) => {
  return (
    <button onClick={props.onClick} style={styles.btn}>
      <div style={styles.btnLine}></div>
      <div style={styles.btnLine}></div>
      <div style={styles.btnLine}></div>
    </button>
  );
};

const styles = {
  btn: {
    height: 24,
    width: 36,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 0,
    boxSizing: "border-box",
    marginLeft: 20,
    marginRight: 20,
  },
  btnLine: {
    width: 30,
    height: 2,
    backgroundColor: "white",
    borderRadius: 20,
  },
};

export default MenuBtn;
