import React, { Fragment } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { withFormik } from "formik";
import * as Yup from "yup";

const CreateCommentForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleChange
}) => {
  const { text } = values;
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Your thoughts:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={text}
            onChange={handleChange}
            name="text"
          />
        </Form.Group>
        <Button type="submit">Add Comment</Button>
      </Form>
      {touched.text && errors.text && (
        <Alert variant="danger">
          Errors:
          {<li>{errors.text}</li>}
        </Alert>
      )}
    </Fragment>
  );
};

const CreateComment = withFormik({
  mapPropsToValues: () => ({
    text: ""
  }),
  validationSchema: Yup.object().shape({
    text: Yup.string().required("Comment should not be empty")
  }),
  handleSubmit: values => {
    console.log(values);
  }
})(CreateCommentForm);

export default CreateComment;
