import React from "react";
import globalStyles from "../../config/globalStyles";

const Card = (props) => {
  return (
    <div style={{ ...styles.card, ...props.style }}>
      <div style={{ ...styles.header, ...props.headerStyles }}>
        {props.header}
      </div>
      <div style={{ ...styles.body, ...props.bodyStyles }}>{props.body}</div>
      <div style={{ ...styles.footer, ...props.footerStyles }}>
        {props.footer}
      </div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: globalStyles.borderRadius,
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    width: "100%",
  },
  body: {
    width: "100%",
  },
  footer: {
    width: "100%",
  },
};

export default Card;
