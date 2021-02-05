import React, { useEffect, useState } from "react";

import globalStyles from "../../config/globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { getPost, getComments } from "../../actions/postActions";
import { useMediaPredicate } from "react-media-hook";
import Loading from "../../components/UI/Loading";
import FullMemeCard from "../../components/UI/FullMemeCard";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import Link from "../../components/UI/Link";
import Backdrop from "../../components/UI/Backdrop";
import colors from "../../config/colors";

const PostContent = (props) => {
  const dispatch = useDispatch();
  const biggerThan1024 = useMediaPredicate("(min-width: 1024px)");
  const biggerThan720 = useMediaPredicate("(min-width: 720px)");
  const [toggleModal, setToggleModal] = useState(false);

  const { postId } = props;

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    dispatch(getPost(postId));
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  const post = useSelector(
    (state) => ({
      post: state.posts.post,
    }),
    []
  );

  const comments = useSelector(
    (state) => ({
      comments: state.posts.comments,
    }),
    []
  );

  if (!post.post) {
    return (
      <div style={globalStyles.fullScreenLoading}>
        <Loading />
      </div>
    );
  }

  const ModalBody = () => {
    return (
      <div>
        <h4 style={styles.modalMessage}>
          You need to be signed in to interact with content on our site.
        </h4>
        <div style={styles.modalBtnContainer}>
          <Link to="/login">
            <Button
              title="Login"
              style={{ backgroundColor: colors.green, marginRight: 10 }}
            />
          </Link>
          <Link to="/signup">
            <Button
              title="Signup"
              style={{ backgroundColor: colors.tertiary }}
            />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Modal
        header={<h1>Hey there!</h1>}
        body={<ModalBody />}
        close={handleToggleModal}
        isOpen={toggleModal}
      />
      {toggleModal ? <Backdrop /> : null}
      {biggerThan1024 ? (
        <div style={styles.container}>
          <div style={styles.content}>
            <FullMemeCard
              toggleModal={handleToggleModal}
              comments={comments.comments}
              post={post.post}
            />
          </div>
        </div>
      ) : biggerThan720 ? (
        <div style={styles.mediumContainer}>
          <div style={styles.content}>
            <FullMemeCard
              toggleModal={handleToggleModal}
              comments={comments.comments}
              post={post.post}
            />
          </div>
        </div>
      ) : (
        <div style={styles.smallContainer}>
          <div style={styles.content}>
            <FullMemeCard
              toggleModal={handleToggleModal}
              comments={comments.comments}
              post={post.post}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const styles = {
  container: {
    marginLeft: "35vw",
    marginRight: "35vw",
    height: "calc(100vh - 56px)",
    marginTop: "60px",
    marginBottom: "60px",
    display: "flex",
    flexDirection: "column",
    paddingBottom: 20,
  },
  mediumContainer: {
    marginLeft: "20vw",
    marginRight: "20vw",
    height: "calc(100vh - 56px)",
    marginTop: "60px",
    marginBottom: "60px",
  },
  smallContainer: {
    marginLeft: "5vw",
    marginRight: "5vw",
    height: "calc(100vh - 56px)",
    marginTop: "60px",
    marginBottom: "60px",
  },
  content: {
    maxWidth: "90vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 20,
  },
  modalMessage: {
    textAlign: "center",
  },
  modalBtnContainer: {
    display: "flex",
    justifyContent: "center",
  },
  loading: {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
  },
};

export default PostContent;
