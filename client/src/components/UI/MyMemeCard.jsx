import React from "react";

import globalStyles from "../../config/globalStyles";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdChat,
  MdDelete,
} from "react-icons/md";
import Link from "../UI/Link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APIURL } from "../../config/vars";
import { store } from "react-notifications-component";
import { deletePost } from "../../actions/postActions";

const MyMemeCard = (props) => {
  const dispatch = useDispatch();
  const { post } = props;

  const auth = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    []
  );

  const handleDelete = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.auth.token}`,
      },
    };

    axios
      .delete(`${APIURL}posts/${post._id}`, config)
      .then(() => {
        dispatch(deletePost(post._id));
      })
      .catch(() => {
        store.addNotification({
          title: "Error!",
          message: "Something went wrong deleting your post",
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
      });
  };

  return (
    <div style={styles.card}>
      <p style={{ ...styles.category, ...globalStyles.hint }}>
        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
      </p>
      <Link to={`post/${post._id}`}>
        <h3 style={styles.title}>{post.title}</h3>
      </Link>
      <div>
        {post.content.endsWith("mp4") ||
        post.content.endsWith("ogg") ||
        post.content.endsWith("webm") ? (
          <video src={post.content} style={styles.content} controls />
        ) : (
          <img src={post.content} style={styles.content} alt={post.title} />
        )}
      </div>
      <div style={styles.interactions}>
        <div style={styles.interaction}>
          <React.Fragment>
            <MdKeyboardArrowUp style={globalStyles.icon} />
            <p style={styles.interactionNumber}>{post.upVotes.length}</p>
          </React.Fragment>
        </div>
        <div style={styles.interaction}>
          <React.Fragment>
            <MdKeyboardArrowDown style={globalStyles.icon} />
            <p style={styles.interactionNumber}>{post.downVotes.length}</p>
          </React.Fragment>
        </div>
        <Link to={`post/${post._id}`}>
          <div style={styles.interaction}>
            <MdChat style={globalStyles.icon} />
            <p style={styles.interactionNumber}>{post.comments.length}</p>
          </div>
        </Link>
        <div style={styles.interaction}>
          <MdDelete style={globalStyles.icon} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: globalStyles.borderRadius,
    boxShadow: globalStyles.boxShadow,
    width: "calc(100% - 40px)",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
  },
  category: {
    marginTop: 0,
    marginBottom: 10,
  },
  content: {
    width: "100%",
    height: "auto",
  },
  interactions: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  interaction: {
    borderRadius: globalStyles.borderRadius,
    boxShadow: globalStyles.boxShadow,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  interactionNumber: {
    marginLeft: 5,
  },
};

export default MyMemeCard;
