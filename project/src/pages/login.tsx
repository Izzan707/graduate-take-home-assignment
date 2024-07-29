import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Formik, Field, Form } from 'formik';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/Section/FullScreen';
import LayoutGuest from '../layouts/Guest';
import FormField from '../components/Form/Field';
import FormCheckRadio from '../components/Form/CheckRadio';
import Divider from '../components/Divider';
import Buttons from '../components/Buttons';
import { getPageTitle } from '../config';
import Head from 'next/head';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (formValues: LoginForm) => {
    setErrorMessage(null); // Reset previous error messages
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: formValues.email,
        password: formValues.password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        router.push('/profile');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during login');
    }
  };

  const validate = (values: LoginForm) => {
    const errors: Partial<LoginForm> = {};

    if (!values.email) {
      errors.email = 'Email is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const initialValues: LoginForm = {
    email: '',
    password: '',
    remember: true,
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <FormField label="Email" help="Please enter your email">
                  <Field name="email" type="email" />
                </FormField>
                {errors.email && touched.email && (
                  <div className="text-red-500 mb-4">{errors.email}</div>
                )}

                <FormField label="Password" help="Please enter your password">
                  <Field name="password" type="password" />
                </FormField>
                {errors.password && touched.password && (
                  <div className="text-red-500 mb-4">{errors.password}</div>
                )}

                <FormCheckRadio type="checkbox" label="Remember">
                  <Field type="checkbox" name="remember" />
                </FormCheckRadio>

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                <Divider />

                <Buttons>
                  <Button type="submit" label="Login" color="info" />
                  <Button href="/register" label="Register" color="info" outline />
                </Buttons>
              </Form>
            )}
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

export default LoginPage;
