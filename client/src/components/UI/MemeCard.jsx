import React from "react";

import globalStyles from "../../config/globalStyles";
import colors from "../../config/colors";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdChat } from "react-icons/md";
import Link from "../UI/Link";
import { useSelector, useDispatch } from "react-redux";
import { upVote, downVote } from "../../actions/postActions";

const MemeCard = (props) => {
  const dispatch = useDispatch();
  const { post, toggleModal } = props;

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
      dispatch(upVote(post));
    }
  };

  const checkDownvote = post.downVotes.find(
    (downVote) => downVote === auth.auth.userId
  );

  const downVotePost = (post) => {
    if (!auth.auth.user) {
      toggleModal();
    } else {
      dispatch(downVote(post));
    }
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
        <Link to={`post/${post._id}`}>
          <div style={styles.interaction}>
            <MdChat style={globalStyles.icon} />
            <p style={styles.interactionNumber}>{post.comments.length}</p>
          </div>
        </Link>
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
};

export default MemeCard;
