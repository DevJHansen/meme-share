import React, { useState, useEffect } from "react";

import globalStyles from "../../config/globalStyles";
import Navbar from "../../components/UI/Navbar";
import Backdrop from "../../components/UI/Backdrop";
import SideMenu from "../../components/UI/SideMenu";
import Button from "../../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { getMyPosts } from "../../actions/postActions";
import { useHistory } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import ReactEmoji from "react-emoji";
import Loading from "../../components/UI/Loading";
import AccountForm from "./AccountForm";
import MyPosts from "./MyPosts";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  const posts = useSelector(
    (state) => ({
      posts: state.posts.myPosts,
    }),
    []
  );

  const handleSideMenu = () => {
    setToggleSideMenu(!toggleSideMenu);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(`/login`);
  };

  const auth = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    []
  );

  const loadingPosts = useSelector(
    (state) => ({
      loadingPosts: state.posts.loadingMyPosts,
    }),
    []
  );

  if (!auth.auth.user) {
    return (
      <div style={globalStyles.fullScreenLoading}>
        <Loading />
      </div>
    );
  }

  const Footer = () => {
    return (
      <Button
        style={styles.footerBtn}
        title="Logout"
        handlePress={handleLogout}
      />
    );
  };

  const bodyLinks = [
    {
      title: "New Post",
      to: "/new",
      icon: <MdCreate style={globalStyles.icon} />,
    },
    {
      title: "All",
      to: "/",
      icon: (
        <div style={globalStyles.icon}>{ReactEmoji.emojify(":clipboard:")}</div>
      ),
    },
    {
      title: "Funny",
      to: "/funny",
      icon: <div style={globalStyles.icon}>{ReactEmoji.emojify(":joy:")}</div>,
    },
    {
      title: "Cute",
      to: "/cute",
      icon: (
        <div style={globalStyles.icon}>
          {ReactEmoji.emojify(":heart_eyes:")}
        </div>
      ),
    },
    {
      title: "Awesome",
      to: "/awesome",
      icon: (
        <div style={globalStyles.icon}>
          {ReactEmoji.emojify(":sunglasses:")}
        </div>
      ),
    },
    {
      title: "Gaming",
      to: "/gaming",
      icon: (
        <div style={globalStyles.icon}>{ReactEmoji.emojify(":computer:")}</div>
      ),
    },
    {
      title: "News",
      to: "/news",
      icon: (
        <div style={globalStyles.icon}>{ReactEmoji.emojify(":newspaper:")}</div>
      ),
    },
    {
      title: "Other",
      to: "/other",
      icon: (
        <div style={globalStyles.icon}>{ReactEmoji.emojify(":ghost:")}</div>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.containerInner}>
        <Navbar onClick={handleSideMenu} />
        {toggleSideMenu ? <Backdrop onClick={handleSideMenu} /> : null}
        <SideMenu
          isOpen={toggleSideMenu}
          bodyLinks={bodyLinks}
          footer={<Footer />}
        />
        <AccountForm />
        {loadingPosts.loadingPosts ? <Loading /> : <MyPosts myPosts={posts} />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
  },
  containerInner: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  footerBtn: {
    boxShadow: "none",
  },
};

export default Profile;
