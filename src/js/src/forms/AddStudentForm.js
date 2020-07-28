import React from "react";
import { Field, Formik } from "formik";
import { Button, Input, Tag } from "antd";
import { addNewStudent } from "../client";

const inputBottomMargin = { marginBottom: '5px' };
const tagStyle = {
  backgroundColor: '#f50',
  color: 'white',
  ...inputBottomMargin
};

const AddStudentForm = (props) => (
  <Formik
    initialValues={{ firstName: '', lastName: '', gender: '', email: '' }}
    validate={values => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = 'First name is required';
      }
      if (!values.lastName) {
        errors.lastName = 'Last name is required';
      }
      if (!values.gender) {
        errors.gender = 'Gender is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(student, { setSubmitting }) => {
      addNewStudent(student).then(() => {
        props.onSuccess();
        setSubmitting(false);
      })
    }}
  >
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
        /* and other goodies */
      }) => (
      <form onSubmit={handleSubmit}>
        <Input
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          placeholder='Last name. e.g Doe'
          style={inputBottomMargin}
        />
        {errors.firstName && touched.firstName &&
        <Tag style={tagStyle}>{errors.firstName}</Tag>}

        <Input
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          placeholder='First name. e.g John'
          style={inputBottomMargin}
        />
        {errors.lastName && touched.lastName &&
        <Tag style={tagStyle}>{errors.lastName}</Tag>}

        <Input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder='Email. e.g exmple@mail.com'
          style={inputBottomMargin}
        />
        {errors.email && touched.email &&
        <Tag style={tagStyle}>{errors.email}</Tag>}
        <Field
          name="gender"
          as="select"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gender}
          style={{ width: 120, display: "block", marginBottom: 15 }}
          placeholder="Gender"
        >
          <option value="FEMALE">Female</option>
          <option value="MALE">Male</option>
        </Field>
        {errors.gender && touched.gender &&
        <Tag style={tagStyle}>{errors.gender}</Tag>}
        <Button
          onClick={() => submitForm()}
          type="submit"
          disabled={isSubmitting || (touched && !isValid)}>
          Submit
        </Button>
      </form>
    )}
  </Formik>
);

export default AddStudentForm;