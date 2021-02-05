import React from "react";

import { MdAdd } from "react-icons/md";

import colors from "../../config/colors";

import { useMediaPredicate } from "react-media-hook";

const ImageUpload = (props) => {
  const hiddenFileInput = React.useRef(null);

  const smallScreen = useMediaPredicate("(max-width: 600px)");
  const mediumScreen = useMediaPredicate("(max-width: 1200px)");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileURL = URL.createObjectURL(event.target.files[0]);
    const file = event.target.files[0];
    props.handleFile(fileURL, file);
  };

  return (
    <div>
      <div
        style={
          smallScreen
            ? {
                ...styles.pickerBtn,
                ...styles.pickerBtnSm,
              }
            : mediumScreen
            ? {
                ...styles.pickerBtn,
                ...styles.pickerBtnMd,
              }
            : {
                ...styles.pickerBtn,
                ...styles.pickerBtnLg,
              }
        }
        onClick={handleClick}
      >
        <MdAdd style={styles.icon} />
      </div>
      <input
        type="file"
        required={props.required}
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="video/*,image/*"
        multiple
      />
    </div>
  );
};

const styles = {
  pickerBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid ${colors.primary}`,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
  },
  pickerBtnLg: {
    height: "10vw",
    width: "10vw",
  },
  pickerBtnMd: {
    height: "30vw",
    width: "30vw",
  },
  pickerBtnSm: {
    height: "40vw",
    width: "40vw",
  },
  icon: {
    color: colors.primary,
    height: 36,
    width: "auto",
  },
};

export default ImageUpload;
