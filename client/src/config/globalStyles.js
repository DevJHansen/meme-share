import colors from "./colors";

export default {
  errorValidation: {
    boxShadow: `0px 0px 5px ${colors.tertiary}`,
  },
  successValidation: {
    boxShadow: `0px 0px 5px ${colors.green}`,
  },
  boxShadow: "5px 5px 5px #c1c1c1",
  boxShadowDark: "5px 5px 5px #000000",
  hint: {
    fontSize: "14px",
    color: "grey",
  },
  titleFont: "Aldrich, sans-serif",
  icon: {
    height: 24,
    width: "auto",
  },
  fullScreenLoading: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  borderRadius: 20,
  container: {
    maxWidth: "100vw",
    minHeight: "calc(100vh - 56px)",
    marginTop: "56px",
  },
};
