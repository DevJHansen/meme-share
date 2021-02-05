import React from "react";

import { MdClose } from "react-icons/md";

import Button from "../UI/Button";

import colors from "../../config/colors";

const Modal = (props) => {
  return (
    <div
      style={
        props.isOpen
          ? { ...styles.container, ...styles.open, ...props.style }
          : { ...styles.container, ...props.style }
      }
    >
      <div style={styles.modal}>
        <div style={styles.header}>
          <MdClose style={styles.closeIcon} onClick={props.close} />
          <div style={styles.headerContent}>{props.header}</div>
          <div></div>
        </div>
        <div style={styles.body}>{props.body}</div>
        <div style={styles.footer}>
          <Button style={styles.btn} title="Done" handlePress={props.close} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: "fixed",
    zIndex: 200,
    backgroundColor: "transparent",
    transform: "translateY(-100%)",
    transition: "transform 0.3s ease-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  open: {
    transform: "translateY(0)",
  },
  modal: {
    boxShadow: "0px 0px 7px rgb(0, 0, 0, 0.5)",
    backgroundColor: "white",
    color: "black",
    borderRadius: 20,
    width: 800,
    maxHeight: "75vh",
    maxWidth: "75vw",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    padding: 10,
    height: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContent: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  closeIcon: {
    height: 24,
    width: "auto",
    cursor: "pointer",
    color: colors.text,
  },
  body: {
    padding: 10,
    overflow: "auto",
  },
  footer: {
    padding: 10,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 200,
    backgroundColor: colors.text,
  },
};

export default Modal;
