import React from "react";

import { MdClose } from "react-icons/md";

const ImageViewer = (props) => {
  return (
    <div
      style={
        props.isOpen
          ? { ...styles.container, ...styles.open, ...props.style }
          : { ...styles.container, ...props.style }
      }
    >
      <div style={styles.imgContainer}>
        <MdClose style={styles.closeBtn} onClick={props.handleView} />
        <img style={styles.img} alt={props.alt} src={props.src} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: "fixed",
    zIndex: -999,
    backgroundColor: "rgb(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  open: {
    zIndex: 100,
  },
  imgContainer: {
    height: "auto",
    width: "auto",
    maxWidth: "80vw",
    maxHeight: "80vh",
    overflow: "hidden",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    flexSrink: 0,
    width: "100%",
    height: "auto",
  },
  closeBtn: {
    top: 0,
    right: 0,
    position: "fixed",
    height: 36,
    width: "auto",
    color: "white",
    cursor: "pointer",
    margin: 20,
  },
};

export default ImageViewer;
