import React, { useState } from "react";

import globalStyles from "../../config/globalStyles";
import colors from "../../config/colors";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdDelete,
} from "react-icons/md";
import Link from "../UI/Link";
import TextArea from "../UI/TextArea";
import Button from "../UI/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  postPageUpVote,
  postPageDownVote,
  getComments,
  deleteComment,
} from "../../actions/postActions";
import axios from "axios";
import { APIURL } from "../../config/vars";
import { store } from "react-notifications-component";

const FullMemeCard = (props) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { post, toggleModal, comments } = props;

  const auth = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    []
  );

  const checkUpvote = post.upVotes.find(
    (upVote) => upVote === auth.auth.userId
  );

  const upVotePost = (post) => {
    if (!auth.auth.user) {
      toggleModal();
    } else {
      dispatch(postPageUpVote(post));
    }
  };

  const checkDownvote = post.downVotes.find(
    (downVote) => downVote === auth.auth.userId
  );

  const downVotePost = (post) => {
    if (!auth.auth.user) {
      toggleModal();
    } else {
      dispatch(postPageDownVote(post));
    }
  };

  const handleComment = () => {
    if (!auth.auth.user) {
      toggleModal();
      return;
    }
    if (!newComment) {
      store.addNotification({
        title: "Error!",
        message: "Comments can't be empty",
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
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${auth.auth.token}`,
      },
    };

    const body = {
      post: post._id,
      comment: newComment,
      user: auth.auth.user._id,
      name: auth.auth.user.name,
    };

    axios
      .post(`${APIURL}posts/${post._id}/comments`, body, config)
      .then(() => {
        dispatch(getComments(post._id));
        setNewComment("");
      })
      .catch(() => {
        store.addNotification({
          title: "Error!",
          message: "Something went wrong uploading your comment",
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

  const handleDelete = (comment) => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.auth.token}`,
      },
    };

    axios
      .delete(`${APIURL}posts/${post._id}/comments/${comment._id}`, config)
      .then(() => {
        dispatch(deleteComment(comment._id));
      })
      .catch(() => {
        store.addNotification({
          title: "Error!",
          message: "Something went wrong deleting your comment",
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
        <div style={styles.interaction} onClick={() => upVotePost(post)}>
          {!auth.auth.isAuthenticated ? (
            <React.Fragment>
              <MdKeyboardArrowUp style={globalStyles.icon} />
              <p style={styles.interactionNumber}>{post.upVotes.length}</p>
            </React.Fragment>
          ) : checkUpvote ? (
            <React.Fragment>
              <MdKeyboardArrowUp
                style={{ ...globalStyles.icon, color: colors.green }}
              />
              <p style={{ ...styles.interactionNumber, color: colors.green }}>
                {post.upVotes.length}
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MdKeyboardArrowUp style={globalStyles.icon} />
              <p style={styles.interactionNumber}>{post.upVotes.length}</p>
            </React.Fragment>
          )}
        </div>
        <div style={styles.interaction} onClick={() => downVotePost(post)}>
          {!auth.auth.isAuthenticated ? (
            <React.Fragment>
              <MdKeyboardArrowDown style={globalStyles.icon} />
              <p style={styles.interactionNumber}>{post.downVotes.length}</p>
            </React.Fragment>
          ) : checkDownvote ? (
            <React.Fragment>
              <MdKeyboardArrowDown
                style={{ ...globalStyles.icon, color: colors.tertiary }}
              />
              <p
                style={{ ...styles.interactionNumber, color: colors.tertiary }}
              >
                {post.downVotes.length}
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MdKeyboardArrowDown style={globalStyles.icon} />
              <p style={styles.interactionNumber}>{post.downVotes.length}</p>
            </React.Fragment>
          )}
        </div>
      </div>
      <div style={styles.commentsContainer}>
        <h3>{`Comments (${comments.length})`}</h3>
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add comment..."
          style={styles.textArea}
        />
        <Button
          style={styles.postBtn}
          title="Post"
          handlePress={handleComment}
        />
      </div>
      <div style={styles.comments}>
        {comments
          .slice(0)
          .reverse()
          .map((comment, i) => {
            return (
              <div style={styles.commentContainer} key={i}>
                <div>
                  <h5 style={styles.commentName}>{comment.name}</h5>
                  <p style={styles.comment}>{comment.comment}</p>
                </div>
                <div>
                  {comment.user === auth.auth.userId ? (
                    <MdDelete
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(comment)}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "white",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: globalStyles.borderRadius,
    boxShadow: globalStyles.boxShadowDark,
    maxWidth: "100%",
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
  textArea: {
    border: `1px solid black`,
    width: "100%",
  },
  postBtn: {
    marginTop: 15,
    backgroundColor: colors.tertiary,
  },
  comments: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1px solid grey",
  },
  commentContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  commentName: {
    margin: 0,
    color: colors.primary,
  },
  comment: {
    margin: 0,
    marginTop: 5,
  },
};

export default FullMemeCard;
