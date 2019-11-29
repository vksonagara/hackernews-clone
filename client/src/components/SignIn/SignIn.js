import React from "react";
import { withFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";
import httpClient from "../../axios";
import { withRouter } from "react-router-dom";
import "./signin.scss";

const SignInForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleSubmit
}) => {
  return (
    <div>
      <h2 className="form-header">Sign In</h2>
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
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Sign In
        </Button>
        <p className="extra-info">
          Not a member?{" "}
          <LinkContainer to="/signup">
            <a href="#!">Sign Up</a>
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

const SignIn = withFormik({
  mapPropsToValues: props => ({
    username: "",
    password: "",
    history: props.history
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required")
  }),
  handleSubmit: (values, { setSubmitting, setErrors }) => {
    const { username, password } = values;
    httpClient
      .post("/auth/signin", {
        username,
        password
      })
      .then(response => {
        values.history.push("/");
      })
      .catch(error => {
        setErrors({ server: "username or password is invalid" });
        setSubmitting(false);
      });
  }
})(SignInForm);

export default withRouter(SignIn);
