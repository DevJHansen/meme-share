import React, { useState } from "react";

import globalStyles from "../../config/globalStyles";
import Navbar from "../../components/UI/Navbar";
import Backdrop from "../../components/UI/Backdrop";
import SideMenu from "../../components/UI/SideMenu";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import colors from "../../config/colors";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import { useHistory } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import backgroundImg from "../../assets/images/memes.jpg";
import { MdPerson } from "react-icons/md";
import ReactEmoji from "react-emoji";
import FormBody, { FormFooter } from "../../components/singleUse/newPost/Form";

const NewPost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const biggerThan1024 = useMediaPredicate("(min-width: 1024px)");
  const biggerThan720 = useMediaPredicate("(min-width: 720px)");
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  const handleSideMenu = () => {
    setToggleSideMenu(!toggleSideMenu);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(`/login`);
  };

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
      title: "Profile",
      to: "/profile",
      icon: <MdPerson style={globalStyles.icon} />,
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
        <Card
          style={
            !biggerThan720
              ? styles.contentSmall
              : biggerThan720 && !biggerThan1024
              ? styles.contentMedium
              : styles.content
          }
          header={<h4 style={styles.header}>New Post</h4>}
          body={<FormBody />}
          footer={<FormFooter />}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  containerInner: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    overflow: "scroll",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  content: {
    width: "50%",
  },
  contentMedium: {
    width: "70%",
  },
  contentSmall: {
    width: "90%",
  },
  header: {
    color: colors.tertiary,
    fontSize: 26,
    fontFamily: globalStyles.titleFont,
  },
  footerBtn: {
    boxShadow: "none",
  },
};

export default NewPost;
