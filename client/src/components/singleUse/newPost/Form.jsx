import React, { useState } from "react";

import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Link from "../../UI/Link";
import Loading from "../../UI/Loading";
import ImageUpload from "../../UI/ImageUpload";
import ImageBox from "../../UI/ImageBox";
import Colors from "../../../config/colors";
import Select from "../../UI/Select";
import axios from "axios";
import { APIURL } from "../../../config/vars";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";

export const FormFooter = () => {
  return (
    <div style={styles.link}>
      <Link style={styles.linkBtn} to="/">
        <Button
          style={{ ...styles.footerBtn, backgroundColor: Colors.tertiary }}
          title="Cancel"
        />
      </Link>
    </div>
  );
};

const FormBody = (props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [fileURL, setFileURL] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const auth = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    []
  );

  const options = [
    {
      option: "DEFAULT",
      value: "Select Category",
    },
    {
      option: "Funny",
      value: "funny",
    },
    {
      option: "Cute",
      value: "cute",
    },
    {
      option: "Awesome",
      value: "awesome",
    },
    {
      option: "Gaming",
      value: "gaming",
    },
    {
      option: "News",
      value: "news",
    },
    {
      option: "Other",
      value: "other",
    },
  ];

  const handlePost = () => {
    setLoading(true);
    if (!title || !category || !fileURL) {
      store.addNotification({
        title: "Error!",
        message: "Please fill out all fields before posting",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${auth.auth.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    let bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("category", category);
    bodyFormData.append("file", file);

    axios
      .post(`${APIURL}posts`, bodyFormData, config)
      .then(() => {
        history.push(`/`);
      })
      .catch(() => {
        store.addNotification({
          title: "Error!",
          message: "Something went wrong uploading your post",
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        setLoading(false);
      });
  };

  const handleFile = (fileURL, file) => {
    setFileURL(fileURL);
    setFile(file);
  };

  const handleRemoveFile = () => {
    setFileURL(null);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSelect = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div style={styles.selectFile}>
        {fileURL ? (
          <div>
            <ImageBox
              src={fileURL}
              file={file}
              alt="meme"
              handleCancel={handleRemoveFile}
              handleFile={handleFile}
            />
          </div>
        ) : (
          <ImageUpload required={true} handleFile={handleFile} />
        )}
      </div>
      <Select
        items={options}
        style={styles.select}
        select={handleSelect}
        required
      />
      <Input
        value={title}
        onChange={handleTitleChange}
        type="text"
        placeholder="Title"
        style={styles.input}
        required
      />
      {loading ? (
        <div style={styles.loading}>
          <Loading />
        </div>
      ) : (
        <Button style={styles.button} handlePress={handlePost} title="Post" />
      )}
    </div>
  );
};

const styles = {
  button: {
    margin: 5,
    width: "90%",
    backgroundColor: Colors.primary,
  },
  input: {
    margin: 5,
    width: "90%",
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  selectFile: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  select: {
    marginBottom: 5,
    borderRadius: 20,
  },
  linkText: {
    fontSize: 12,
    margin: 4,
    color: "#f1f1f1",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  linkBtn: {
    marginLeft: 2,
    marginRight: 2,
    width: "100%",
  },
  footerBtn: {
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
  },
  loading: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
};

export default FormBody;
