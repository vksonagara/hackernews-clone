import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

export default function Post(props) {
  const { id, title, relativeTime, commentsCount, username } = props.post;
  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              <LinkContainer to={`/post/${id}`}>
                <a href="#!">{title}</a>
              </LinkContainer>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              By <a href="#!">{username}</a>, {relativeTime} |{" "}
              {`${commentsCount} `}
              <a href="#!">comments</a>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
