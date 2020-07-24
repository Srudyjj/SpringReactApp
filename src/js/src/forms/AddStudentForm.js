import React from "react";
import { Formik } from "formik";
import { Button, Input, Select, Tag } from "antd";

const { Option } = Select;
const inputBottomMargin = { marginBottom: '5px' };
const tagStyle = {
  backgroundColor: '#f50',
  color: 'white',
  ...inputBottomMargin
};

const AddStudentForm = () => (
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
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
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
        submitForm
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

        <Select
          name="gender"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gender}
          style={{ width: 120, display: "block", marginBottom: 15 }}
          placeholder="Gender"
        >
          <Option value="female">Female</Option>
          <Option value="male">Male</Option>
        </Select>
        {errors.gender && touched.gender &&
        <Tag style={tagStyle}>{errors.gender}</Tag>}
        <Button onClick={() => submitForm()} type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    )}
  </Formik>
);

export default AddStudentForm;