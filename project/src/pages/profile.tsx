import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiMail,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBox/Component/Body'
import CardBoxComponentFooter from '../components/CardBox/Component/Footer'
import FormField from '../components/Form/Field'
import SectionMain from '../components/Section/Main'
import CardBoxUser from '../components/CardBox/User'
import type { UserForm } from '../interfaces'
import { getPageTitle } from '../config'
import { useAppSelector } from '../stores/hooks'
import withAuth from '../components/withAuth';  

const ProfilePage = () => {
  const userName = useAppSelector((state) => state.main.userName)
  const userEmail = useAppSelector((state) => state.main.userEmail)

  const userForm: UserForm = {
    name: userName,
    email: userEmail,
  }

  const [aboutMe, setAboutMe] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('aboutMeDraft')
      if (draft) {
        setAboutMe(draft)
      }
    }
  }, [])

  const handleSubmitAboutMe = (values: { aboutMe: string }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aboutMeSubmitted', values.aboutMe)
      alert('About Me submitted successfully!')
    }
  }

  const handleSaveDraft = (values: { aboutMe: string }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aboutMeDraft', values.aboutMe)
      alert('About Me draft saved successfully!')
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      <SectionMain>

        <CardBoxUser className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">

            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={userForm}
                onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="Name"
                      help="Required. Your name"
                      labelFor="name"
                      icons={[mdiAccount]}
                    >
                      <Field name="name" id="name" placeholder="Name" />
                    </FormField>
                    <FormField
                      label="E-mail"
                      help="Required. Your e-mail"
                      labelFor="email"
                      icons={[mdiMail]}
                    >
                      <Field name="email" id="email" placeholder="E-mail" />
                    </FormField>
                  </CardBoxComponentBody>
                  <CardBoxComponentFooter>
                    <Buttons>
                      <Button color="info" type="submit" label="Submit" />
                    </Buttons>
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox>
            <CardBox className="mt-6">
              <Formik initialValues={{ aboutMe }} onSubmit={handleSubmitAboutMe} enableReinitialize
                >
                {({ values }) => (
                  <Form>
                    <CardBoxComponentBody>
                      <FormField
                        label="About Me"
                        help="Write something about yourself"
                      >
                        <Field
                          as="textarea"
                          name="aboutMe"
                          rows={5}
                          className="w-full"
                        />
                      </FormField>
                    </CardBoxComponentBody>
                    <CardBoxComponentFooter>
                      <Buttons>
                        <Button
                          color="info"
                          type="submit"
                          label="Submit"
                        />
                        <Button
                          color="info"
                          label="Save as Draft"
                          onClick={() => handleSaveDraft(values)}
                          outline
                        />
                      </Buttons>
                    </CardBoxComponentFooter>
                  </Form>
                )}
              </Formik>
            </CardBox>
          </div>

          <CardBox hasComponentLayout>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    label="Current password"
                    help="Required. Your current password"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormField>

                  <Divider />

                  <FormField
                    label="New password"
                    help="Required. New password"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>

                  <FormField
                    label="Confirm password"
                    help="Required. New password one more time"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <Buttons>
                    <Button color="info" type="submit" label="Submit" />
                  </Buttons>
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionMain>
    </>
  )
}

export default withAuth(ProfilePage);
