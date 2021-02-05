import React from "react";

import Link from "../UI/Link";

import colors from "../../config/colors";
import globalStyles from "../../config/globalStyles";

import { useMediaPredicate } from "react-media-hook";

const SideMenu = (props) => {
  const smallerThan668 = useMediaPredicate("(max-height: 668px)");

  const DefaultHeader = () => {
    return <h2 style={styles.heading}>Meme Share</h2>;
  };

  return (
    <div
      style={
        props.isOpen
          ? { ...styles.container, ...styles.open, ...props.style }
          : { ...styles.container, ...props.style }
      }
    >
      <div style={styles.header}>
        {props.header ? props.header : <DefaultHeader />}
      </div>
      <div style={styles.body}>
        {props.bodyLinks.map((link, i) => {
          return (
            <Link
              key={i}
              style={
                smallerThan668
                  ? { ...styles.links, fontSize: "12px" }
                  : { ...styles.links }
              }
              to={link.to}
            >
              <div style={styles.icon}>{link.icon}</div>
              <h3>
                <b>{link.title}</b>
              </h3>
            </Link>
          );
        })}
      </div>
      <div style={styles.footer}>{props.footer}</div>
    </div>
  );
};

const styles = {
  container: {
    top: 0,
    left: 0,
    height: "100vh",
    width: 300,
    maxWidth: "70vw",
    backgroundColor: colors.text,
    boxShadow: "1px 0px 7px rgb(0, 0, 0, 0.5)",
    position: "fixed",
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease-out",
  },
  open: {
    transform: "translateX(0)",
  },
  links: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: 40,
    alignItems: "center",
  },
  header: {
    borderBottom: "1px solid #a1a1a1",
    width: "100%",
    textAlign: "center",
  },
  body: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #a1a1a1",
  },
  icon: {
    color: "white",
    marginRight: 20,
  },
  footer: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontFamily: globalStyles.titleFont,
  },
};

export default SideMenu;
