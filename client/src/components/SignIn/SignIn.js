import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { isEmpty } from "validator";
import httpClient from "../../axios";
import { withRouter } from "react-router-dom";

import "./signin.scss";

const initialState = {
  username: "",
  password: "",
  showError: false,
  errors: [],
  isSubmitting: false
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

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

  handleChange = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let { username, password } = this.state;
    this.setState({ ...initialState });
    let errors = [];
    if (isEmpty(username)) {
      errors = [...errors, "username field is empty"];
    }
    if (isEmpty(password)) {
      errors = [...errors, "password field is empty"];
    }

    if (errors.length === 0) {
      this.setIsSubmitting(true);
      let { history } = this.props;
      try {
        await httpClient.post("/auth/signin", {
          username,
          password
        });
        history.push("/");
      } catch (error) {
        this.setIsSubmitting(false);
        errors = [...errors, "username or password invalid"];
        this.setErrors(errors);
        this.setShowError(true);
      }
    } else {
      this.setErrors(errors);
      this.setShowError(true);
    }
  };

  render() {
    let { username, password, showError, errors, isSubmitting } = this.state;
    return (
      <div>
        <h2 className="form-header">Sign In</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={this.handleChange("username")}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange("password")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isSubmitting ? <Spinner animation="border" /> : "Sign In"}
          </Button>
          <p className="extra-info">
            Not a member?{" "}
            <LinkContainer to="/signup">
              <a href="#!">Sign Up</a>
            </LinkContainer>
          </p>
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

export default withRouter(SignIn);
