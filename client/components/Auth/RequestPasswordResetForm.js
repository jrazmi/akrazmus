import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from "formik";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { TextField, FormStatus, PrimaryButton } from "../Util";
import { MMR, SubMut } from '../../lib/Util';


export const REQUEST_PASSWORD_RESET_MUTATION = gql`
    mutation requestPasswordReset($email: String!, $link:String!){
        requestPasswordReset(email: $email, link: $link) {
            code
            success
            message
        }
    }
`;

const RPRValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(),
})

export class RequestPasswordResetForm extends React.Component {
    submit = async (values, actions, mutation) => {
        const payload = {
            email: values.email,
            link: `${window.location.href}`
        }

        const response = await SubMut(mutation, payload);
        const result = await MMR(response, 'requestPasswordReset');

        actions.setStatus({
            form: {
                success: result.success,
                code:result.code,
                message:result.message
            }
        });

        actions.setSubmitting(false);

    }

    render(){
        return(
            <Mutation mutation={REQUEST_PASSWORD_RESET_MUTATION}>
                {(mutation) => (
                    <Formik
                        initialValues={{
                            email: ""
                        }}
                        validationSchema={RPRValidation}
                        onSubmit={(values,actions) => this.submit(values,actions,mutation)}
                    >
                        {(props) => {
                            return(
                                <Form noValidate>
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