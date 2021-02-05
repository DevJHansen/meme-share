import React from "react";
import colors from "../../config/colors";
import globalStyles from "../../config/globalStyles";
import MyMemeCard from "../../components/UI/MyMemeCard";
import { useMediaPredicate } from "react-media-hook";

const MyPosts = (props) => {
  const { myPosts } = props;

  const biggerThan1076 = useMediaPredicate("(min-width: 1076px)");
  const biggerThan720 = useMediaPredicate("(min-width: 720px)");

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Posts</h2>
      <div style={styles.posts}>
        {myPosts.posts.map((post, i) => {
          return (
            <div
              style={
                !biggerThan720
                  ? styles.smallMemeContainer
                  : biggerThan720 && !biggerThan1076
                  ? styles.mediumMemeContainer
                  : styles.memeContainer
              }
              key={i}
            >
              <MyMemeCard post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
  },
  heading: {
    fontFamily: globalStyles.titleFont,
    color: colors.secondary,
    textAlign: "center",
  },
  posts: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  memeContainer: {
    width: "calc(25% - 20px)",
    margin: 10,
  },
  mediumMemeContainer: {
    width: "calc(50% - 20px)",
    margin: 10,
  },
  smallMemeContainer: {
    width: "calc(100% - 20px)",
    margin: 10,
  },
};

export default MyPosts;
