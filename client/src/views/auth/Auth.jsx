import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { useSelector } from "react-redux";

import colors from "../../config/colors";

import { useMediaPredicate } from "react-media-hook";

import Card from "../../components/UI/Card";
import SignUpForm, {
  SignUpHeader,
  SignUpFooter,
} from "../../components/singleUse/signup/SignUpForm";
import LoginForm, {
  LoginHeader,
  LoginFooter,
} from "../../components/singleUse/login/LoginForm";

const Auth = (props) => {
  const biggerThan1200 = useMediaPredicate("(min-width: 1200px)");
  const biggerThan620 = useMediaPredicate("(min-width: 620px)");

  const auth = useSelector(
    (state) => ({
      auth: state.auth,
    }),
    []
  );

  if (auth.auth.token) {
    return (
      <Route>
        <Redirect to="/" />
      </Route>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Switch>
          <Route
            path="/login"
            component={() => {
              return (
                <Card
                  style={
                    !biggerThan620
                      ? styles.cardSmallScreen
                      : biggerThan620 && !biggerThan1200
                      ? styles.cardMediumScreen
                      : styles.cardBigScreen
                  }
                  header={<LoginHeader />}
                  body={<LoginForm />}
                  footer={<LoginFooter />}
                />
              );
            }}
          />
          <Route
            path="/signup"
            component={() => {
              return (
                <Card
                  style={
                    !biggerThan620
                      ? styles.cardSmallScreen
                      : biggerThan620 && !biggerThan1200
                      ? styles.cardMediumScreen
                      : styles.cardBigScreen
                  }
                  header={<SignUpHeader />}
                  body={<SignUpForm />}
                  footer={<SignUpFooter />}
                />
              );
            }}
          />
        </Switch>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: colors.secondary,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  cardBigScreen: {
    minHeight: "50vh",
    padding: 30,
  },
  cardMediumScreen: {
    width: "40vw",
    minHeight: "50vh",
    padding: 30,
  },
  cardSmallScreen: {
    width: "80vw",
    minHeight: "60vh",
    padding: 20,
  },
};

export default Auth;
