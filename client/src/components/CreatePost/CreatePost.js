import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import httpClient from "../../axios";

const initialState = {
  title: "",
  text: "",
  showError: false,
  errors: [],
  isSubmitting: false
};

export default class CreatePost extends Component {
  state = { ...initialState };

  setShowError = value => {
    this.setState({
      showError: value
    });
  };

  setIsSubmitting = value => {
    this.setState({
      isSubmitting: value
    });
  };

  setErrors = errors => {
    this.setState(prevState => {
      const prevErrors = prevState.errors;
      return {
        errors: [...prevErrors, ...errors]
      };
    });
  };

  handleChange = key => e => {
    this.setState({
      [key]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let { title, text } = this.state;
    let user_id = "5ddff47c2e307f2c70888f42";
    this.setState({ ...initialState });
    let errors = [];
    if (errors.length === 0) {
      this.setIsSubmitting(true);
      try {
        await httpClient.post("/posts", {
          title,
          text,
          user_id
        });
        this.setIsSubmitting(false);
      } catch (error) {
        this.setIsSubmitting(false);
        errors = [...errors, "some error occurred white saving post try again"];
        this.setErrors(errors);
        this.setShowError(true);
        console.log(error);
      }
    } else {
      this.setErrors(errors);
      this.setShowError(true);
    }
  };

  render() {
    let { title, text, showError, errors, isSubmitting } = this.state;
    return (
      <div>
        <h2>Create a post</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              as="input"
              value={title}
              onChange={this.handleChange("title")}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea2">
            <Form.Label>Post content</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={text}
              onChange={this.handleChange("text")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isSubmitting ? <Spinner animation="border" /> : "Create Post"}
          </Button>
        </Form>
        {showError ? (
          <Alert variant="danger">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </Alert>
        ) : (
          ""
        )}
      </div>
    );
  }
}
