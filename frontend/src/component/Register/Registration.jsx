import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form, Input, LoginLink, RegisterContainer, Title } from './RegisterStyled'; // Assuming your custom styled components are imported correctly
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ErrorText } from '../Login/LoginStyled';

function Registration() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      try {
        const response = await axios.post('/register', values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);

        resetForm();
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 400 && error.response.data.message === 'Email already registered') {
          setFieldError('email', 'Email already registered');
        } else {
          setFieldError('email', 'Registration failed. Please try again.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <RegisterContainer>
      <Title>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
        Sign up
      </Title>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorText>{formik.errors.email}</ErrorText>
        ) : null}
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorText>{formik.errors.password}</ErrorText>
        ) : null}
        <Button type="submit" disabled={formik.isSubmitting}>
          Register
        </Button>
        <LoginLink to="/login">Already have an account? Login</LoginLink>
      </Form>
    </RegisterContainer>
  );
}

export default Registration;
