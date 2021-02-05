import React, { useEffect, useState } from "react";

import globalStyles from "../../config/globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, loadMorePosts } from "../../actions/postActions";
import { useMediaPredicate } from "react-media-hook";
import Loading from "../../components/UI/Loading";
import MemeCard from "../../components/UI/MemeCard";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import Link from "../../components/UI/Link";
import Backdrop from "../../components/UI/Backdrop";
import colors from "../../config/colors";
import InfiniteScroll from "react-infinite-scroll-component";

const Feed = (props) => {
  const dispatch = useDispatch();
  const biggerThan1024 = useMediaPredicate("(min-width: 1024px)");
  const biggerThan720 = useMediaPredicate("(min-width: 720px)");
  const [toggleModal, setToggleModal] = useState(false);

  const { category } = props;

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    if (category) {
      dispatch(getPosts(category));
    } else {
      dispatch(getPosts());
    }
  }, [dispatch, category]);

  const posts = useSelector(
    (state) => ({
      posts: state.posts.posts,
    }),
    []
  );

  const loadingPosts = useSelector(
    (state) => ({
      loadingPosts: state.posts.loadingPosts,
    }),
    []
  );

  if (!posts.posts.length) {
    return (
      <div style={globalStyles.fullScreenLoading}>
        <Loading />
      </div>
    );
  }

  const refreshPage = () => {
    if (category) {
      dispatch(getPosts(category));
    } else {
      dispatch(getPosts());
    }
  };

  const loadMore = () => {
    if (category) {
      dispatch(loadMorePosts(category));
    } else {
      dispatch(loadMorePosts());
    }
  };

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
      <InfiniteScroll
        dataLength={posts.posts.length}
        next={() => loadMore()}
        hasMore={true}
        refreshFunction={() => refreshPage()}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
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
              {posts.posts.map((post, i) => {
                return (
                  <React.Fragment key={i}>
                    <MemeCard toggleModal={handleToggleModal} post={post} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ) : biggerThan720 ? (
          <div style={styles.mediumContainer}>
            <div style={styles.content}>
              {posts.posts.map((post, i) => {
                return (
                  <React.Fragment key={i}>
                    <MemeCard toggleModal={handleToggleModal} post={post} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={styles.smallContainer}>
            <div style={styles.content}>
              {posts.posts.map((post, i) => {
                return (
                  <React.Fragment key={i}>
                    <MemeCard toggleModal={handleToggleModal} post={post} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </InfiniteScroll>
      <div style={styles.loading}>
        {loadingPosts.loadingPosts ? <Loading /> : null}
      </div>
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

export default Feed;
