import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from "formik";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { H1, TextField, FormStatus, PrimaryButton } from '../Util';
import { MMR, SubMut } from '../../lib/Util';
import { Site } from '../../lib/siteConfig';
import { setCookie } from 'nookies';
import redirect from '../../lib/redirect';

export const LOGIN_MUTATION = gql`
mutation requestLogin($email: String!, $password: String!) {
    requestLogin(email: $email, password: $password) {
      code
      success
      message
      token
    }
  }
`;


// field validation 
const LoginValidation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
        .required('Required')
  });



export class LoginForm extends React.Component {
    submit = async (values, actions, mutation) => {
        const payload = {
            email: values.email,
            password: values.password
        };
        const response = await SubMut(mutation, payload);
        const result = await MMR(response, 'requestLogin');
        
        if(!result.success) {
            actions.setStatus({
                form: {
                    success: result.success,
                    code:result.code,
                    message:result.message
                }
            });
            actions.setSubmitting(false);
            return;
        } else {
            actions.setSubmitting(false);
            setCookie({}, 'token', result.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            });

            redirect({}, '/');
        }

    }
    render(){

        return(
            <Mutation mutation={LOGIN_MUTATION}>
            {(mutation) => (
                <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginValidation}
                onSubmit={ async (values,actions) => this.submit(values, actions, mutation)}
                >
                    {(props) =>{
                        return(
                            <Form noValidate>
                                <H1>Login</H1>
                                {props.status && props.status.form && 
                                        <FormStatus status={props.status.form}/>
                                    }
                               
                                <Field 
                                    id="email" 
                                    name="email"
                                    label="Email"
                                    placeHolder="Email"
                                    type="text"
                                    component={TextField}
                                    />
                                <Field 
                                    id="password" 
                                    name="password"
                                    label="Password"
                                    placeHolder="Password"
                                    type="password"
                                    component={TextField}
                                    />

                                <PrimaryButton disabled={props.isSubmitting} type="submit" role="button">Submit </PrimaryButton>  
                            </Form>
                        )
                    }}
                  
                </Formik>
            )}
        </Mutation>
    )
    }
}
