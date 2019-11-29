import React, { Component } from "react";
import httpClient from "../../axios";
import Post from "./Post";

export default class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    httpClient.get("/posts").then(response => {
      this.setState({
        posts: response.data
      });
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <>
        {posts.map(post => {
          return <Post key={post.id} post={post} />;
        })}
      </>
    );
  }
}
