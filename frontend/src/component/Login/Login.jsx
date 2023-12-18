import React from 'react';
import { LoginContainer, Title, Form, Input, Button, RegisterLink, ErrorText } from './LoginStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
onSubmit: async (values, { setSubmitting, setErrors }) => {
  try {
    const response = await axios.post('/login', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    console.log(data);

    if (response.status === 200) {
      navigate(`/user/${data.userId}`);
    }
  } catch (error) {
    console.error('Error:', error);
    setErrors({ password: 'Invalid email or password' });
  } finally {
    setSubmitting(false);
  }
},

    
  });

  return (
    <LoginContainer>
      <Title>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
        Sign in
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
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <RegisterLink to="/register">Sign up</RegisterLink>
      </Form>
    </LoginContainer>
  );
}

export default Login;
