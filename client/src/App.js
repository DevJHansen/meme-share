import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";

import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";
import NotFound from "./views/notFound/NotFound";
import PrivateRoute from "./views/auth/PrivateRoute";
import Auth from "./views/auth/Auth";
import All from "./views/feed/All";
import Funny from "./views/feed/Funny";
import Cute from "./views/feed/Cute";
import Awesome from "./views/feed/Awesome";
import Gaming from "./views/feed/Gaming";
import News from "./views/feed/News";
import Other from "./views/feed/Other";
import NewPost from "./views/newPost/NewPost";
import Post from "./views/post/Post";
import Profile from "./views/profile/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <ReactNotification />
      <Router>
        <React.Fragment>
          <Switch>
            <Route component={All} path="/" exact />
            <Route component={Funny} path="/funny" />
            <Route component={Cute} path="/cute" />
            <Route component={Awesome} path="/awesome" />
            <Route component={Gaming} path="/gaming" />
            <Route component={News} path="/news" />
            <Route component={Other} path="/other" />
            <Route component={Post} path="/post/:id" />
            <PrivateRoute component={NewPost} path="/new" />
            <PrivateRoute component={Profile} path="/profile" />
            <Route path="/login" component={Auth} />
            <Route path="/signup" component={Auth} />
            <Route exact component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
