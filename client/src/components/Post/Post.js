import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import httpClient from "../../axios";
import CreateComment from "./CreateComment";
import Comments from "./Comments";

const initialPost = {
  id: "",
  title: "",
  relativeTime: "",
  commentsCount: "",
  username: ""
};

export default function Post(props) {
  let { postId } = useParams();
  let history = useHistory();
  let [post, setPost] = useState({ ...initialPost });

  useEffect(() => {
    httpClient
      .get(`/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        history.push("/");
      });
  }, [postId, history]);

  const { title, text, relativeTime, username, commentsCount } = post;

  return (
    <Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                By <a href="#!">{username}</a>, {relativeTime} | {commentsCount}{" "}
                <a href="#!">comments</a>
              </Card.Subtitle>
              <Card.Text>{text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <CreateComment />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Comments />
      </Row>
    </Fragment>
  );
}
