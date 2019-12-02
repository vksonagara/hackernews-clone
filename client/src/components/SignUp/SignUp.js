import React from "react";
import { withFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";
import httpClient from "../../axios";
import { withRouter } from "react-router-dom";
import "./signup.scss";

const SignUpForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleSubmit
}) => {
  return (
    <div>
      <h2 className="form-header">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Sign Up
        </Button>
        <p className="extra-info">
          Already a member?{" "}
          <LinkContainer to="/signin">
            <a href="#!">Sign In</a>
          </LinkContainer>
        </p>
      </Form>
      {Object.entries(touched).length > 0 && Object.entries(errors).length > 0 && (
        <Alert variant="danger">
          Errors:
          {errors.server && <li>{errors.server}</li>}
          {touched.username && errors.username && <li>{errors.username}</li>}
          {touched.password && errors.password && <li>{errors.password}</li>}
          {touched.confirmPassword && errors.confirmPassword && (
            <li>{errors.confirmPassword}</li>
          )}
        </Alert>
      )}
    </div>
  );
};

const SignUp = withFormik({
  mapPropsToValues: props => ({
    username: "",
    password: "",
    confirmPassword: "",
    history: props.history
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string()
      .min(8, "password must be 8 or more characters")
      .required("password is required"),
    confirmPassword: Yup.string().test(
      "match",
      "passwords do not match",
      function(confirmPassword) {
        return confirmPassword === this.parent.password;
      }
    )
  }),
  handleSubmit: (values, { setSubmitting, setErrors }) => {
    const { username, password } = values;
    httpClient
      .post("/auth/signup", {
        username,
        password
      })
      .then(response => {
        values.history.push("/signin");
      })
      .catch(error => {
        setErrors({ server: "that username is already taken" });
        setSubmitting(false);
      });
  }
})(SignUpForm);

export default withRouter(SignUp);
