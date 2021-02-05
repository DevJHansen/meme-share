import React from "react";

import colors from "../../config/colors";

import { useMediaPredicate } from "react-media-hook";

import { MdClose } from "react-icons/md";

import ImageUploadBtn from "../UI/ImageUploadBtn";

const ImageBox = (props) => {
  const smallScreen = useMediaPredicate("(max-width: 600px)");
  const mediumScreen = useMediaPredicate("(max-width: 1200px)");

  return (
    <div
      style={
        smallScreen
          ? {
              ...styles.imgContainer,
              ...styles.imgSm,
            }
          : mediumScreen
          ? {
              ...styles.imgContainer,
              ...styles.imgMd,
            }
          : {
              ...styles.imgContainer,
              ...styles.imgLg,
            }
      }
    >
      <div style={styles.edit}>
        <MdClose style={styles.editIcon} onClick={props.handleCancel} />
        <ImageUploadBtn handleFile={props.handleFile} photo={props.photo} />
      </div>
      {props.file.name.endsWith("mp4") ||
      props.file.name.endsWith("ogg") ||
      props.file.name.endsWith("webm") ? (
        <video src={props.src} style={styles.content} controls />
      ) : (
        <img src={props.src} style={styles.content} alt="new post" />
      )}
    </div>
  );
};

const styles = {
  imgContainer: {
    border: `1px solid ${colors.primary}`,
    borderRadius: 20,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
  },
  imgLg: {
    width: "10vw",
  },
  imgMd: {
    width: "30vw",
  },
  imgSm: {
    width: "40vw",
  },
  content: {
    width: "100%",
    height: "auto",
  },
  icon: {
    height: 28,
    width: "auto",
    color: colors.primary,
  },
  edit: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: colors.primary,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editIcon: {
    padding: 5,
    color: "white",
    height: 18,
    width: "auto",
  },
};

export default ImageBox;
