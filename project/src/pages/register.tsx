import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/Section/FullScreen';
import LayoutGuest from '../layouts/Guest';
import FormField from '../components/Form/Field';
import Divider from '../components/Divider';
import Buttons from '../components/Buttons';
import { getPageTitle } from '../config';

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (formValues: RegisterForm) => {
    setErrorMessage(null); // Reset previous error messages
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      });

      if (response.data.message === 'User registered successfully') {
        alert('Registration successful');
        router.push('/login');
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  const initialValues: RegisterForm = {
    username: 'Wan Mohamad Izzan',
    email: 'izzan@gmail.com',
    password: '123',
    confirmPassword: '123',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <>
      <Head>
        <title>{getPageTitle('Register')}</title>
      </Head>
      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <FormField label="Username" help="Please enter your username">
                  <Field name="username" />
                </FormField>
                {errors.username && touched.username && (
                  <div className="text-red-500 mb-4">{errors.username}</div>
                )}

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

                <FormField label="Confirm Password" help="Please confirm your password">
                  <Field name="confirmPassword" type="password" />
                </FormField>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 mb-4">{errors.confirmPassword}</div>
                )}

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                <Divider />

                <Buttons>
                  <Button type="submit" label="Register" color="info" />
                  <Button href="/login" label="Login" color="info" outline />
                </Buttons>
              </Form>
            )}
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  );
};

RegisterPage.getLayout = function getLayout(page) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

export default RegisterPage;
