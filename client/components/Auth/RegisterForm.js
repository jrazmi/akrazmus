import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from "formik";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { H1, TextField, FormStatus, PrimaryButton } from '../Util';
import { MMR, SubMut } from '../../lib/Util';
import redirect from "../../lib/redirect";
import { setCookie } from 'nookies';


export const REGISTER_MUTATION = gql`
    mutation register($input: RegisterInput!){
        register(input: $input){
            code
            success
            message
            token
            nextPage
        }
    }
`;

const RegisterValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  });


export class RegisterForm extends React.Component {
    submit = async (values, actions, mutation) => {
        const payload = {
            input: {
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                password: values.password
            }
        }
        const response = await SubMut(mutation, payload);
        const result = await MMR(response, 'register');

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

            // add in verification process?
            setCookie({}, 'token', result.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            });

            redirect({}, '/');
        }
    }

    render(){
        return(
            <Mutation mutation={REGISTER_MUTATION}>
                {(mutation) => (
                    <Formik
                    initialValues={{
                        email: "",
                        first_name: "",
                        last_name: "",
                        password: ""
                    }}
                    validationSchema={RegisterValidation}
                    onSubmit={ async (values, actions) => this.submit(values, actions, mutation)}
                    >
                        {(props) => {
                            return(
                                <Form noValidate>
                                    <H1>Register</H1>
                                    {props.status && props.status.form && 
                                        <FormStatus status={props.status.form}/>
                                    }
                                <Field 
                                    id="first_name" 
                                    name="first_name"
                                    label="First Name"
                                    placeHolder="First Name"
                                    type="text"
                                    component={TextField}
                                    />
                                 <Field 
                                    id="last_name" 
                                    name="last_name"
                                    label="Last Name"
                                    placeHolder="Last Name"
                                    type="text"
                                    component={TextField}
                                    />
                               
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



