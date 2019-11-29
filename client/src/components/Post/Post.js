import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useParams, useHistory } from "react-router-dom";
import httpClient from "../../axios";

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
  }, []);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              By <a href="#!">Vinod</a>, 3 hours ago | 6{" "}
              <a href="#!">comments</a>
            </Card.Subtitle>
            <Card.Text>{post.text}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
