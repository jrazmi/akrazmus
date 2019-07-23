import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from "formik";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { H1, TextField, FormStatus, PrimaryButton } from "../Util";
import { MMR, SubMut } from '../../lib/Util';
import { Site } from '../../lib/siteConfig';
import PropTypes from 'prop-types';
import redirect from '../../lib/redirect';

export const RESET_PASSWORD_MUTATION = gql`
    mutation resetPassword($password: String!, $token: String!){
        resetPassword(password: $password, token: $token){
            code
            success
            message
        }
    }
`;

const RPValidation = Yup.object().shape({password: Yup.string().required()});

export class ResetPasswordForm extends React.Component {
    submit = async (values, actions, mutation, token) => {
        const payload = {
            password: values.password,
            token: token
        }

        const response = await SubMut(mutation, payload);
        const result = await MMR(response, 'resetPassword');

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
            redirect({}, `${Site.routes.auth.login}`);
        }
        
    }
    render(){
        const { token } = this.props;
        return(
            <Mutation mutation={RESET_PASSWORD_MUTATION}>
                {(mutation) => (
                    <Formik 
                        initialValues={{password:""}}
                        validationSchema={RPValidation}
                        onSubmit={ async (values, actions) => this.submit(values, actions, mutation, token)}
                    >
                        {(props) => {
                            return(
                                <Form noValidate>
                                <H1>Reset Password</H1>
                                {props.status && props.status.form && 
                                        <FormStatus status={props.status.form}/>
                                    }
                               
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

ResetPasswordForm.propTypes = {
    token: PropTypes.string.isRequired
}