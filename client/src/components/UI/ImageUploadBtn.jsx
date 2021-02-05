import React from "react";

import { MdRedo } from "react-icons/md";

const ImageUploadBtn = (props) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileURL = URL.createObjectURL(event.target.files[0]);
    if (props.photo) {
      props.handleFile(props.photo, fileURL);
    } else {
      props.handleFile(fileURL);
    }
  };

  return (
    <React.Fragment>
      <MdRedo style={styles.icon} onClick={handleClick} />
      <input
        type="file"
        required={props.required}
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </React.Fragment>
  );
};

const styles = {
  icon: {
    padding: 5,
    color: "white",
    height: 16,
    width: "auto",
  },
};

export default ImageUploadBtn;
