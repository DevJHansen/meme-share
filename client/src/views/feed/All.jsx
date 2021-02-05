import React, { useState } from "react";

import Navbar from "../../components/UI/Navbar";
import Backdrop from "../../components/UI/Backdrop";
import SideMenu from "../../components/UI/SideMenu";
import Button from "../../components/UI/Button";
import ReactEmoji from "react-emoji";

import globalStyles from "../../config/globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { MdPerson, MdPersonAdd, MdCreate } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/authActions";

import Feed from "./Feed";
import backgroundImg from "../../assets/images/memes.jpg";

const All = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

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
      title: "Login",
      to: "/login",
      icon: <MdPerson style={globalStyles.icon} />,
    },
    {
      title: "Signup",
      to: "/signup",
      icon: <MdPersonAdd style={globalStyles.icon} />,
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

  const authBodyLinks = [
    {
      title: "Profile",
      to: "/profile",
      icon: <MdPerson style={globalStyles.icon} />,
    },
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
        {!auth.auth.token ? (
          <SideMenu isOpen={toggleSideMenu} bodyLinks={bodyLinks} />
        ) : null}
        {auth.auth.token ? (
          <SideMenu
            isOpen={toggleSideMenu}
            bodyLinks={authBodyLinks}
            footer={<Footer />}
          />
        ) : null}
        <div>
          <Feed />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
  },
  containerInner: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    overflow: "scroll",
  },
  footerBtn: {
    boxShadow: "none",
  },
  content: {
    marginTop: 56,
  },
};

export default All;
