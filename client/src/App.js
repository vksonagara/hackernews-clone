import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Posts from "./components/Posts/Posts";
import CreatePost from "./components/CreatePost/CreatePost";
import Post from "./components/Post/Post";
import "./scss/app.scss";

function App() {
  return (
    <Router>
      <Header />
      <Container className="contentContainer">
        <Switch>
          <Route path="/" exact>
            <Posts />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/create" exact>
            <CreatePost />
          </Route>
          <Route path="/post/:postId" exact>
            <Post />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
