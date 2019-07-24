import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from "formik";
import { gql } from "apollo-boost";
import { H1, TextField, FormStatus, PrimaryButton } from '../Util';
import { MMR, SubMut } from '../../lib/Util';
import PropTypes from 'prop-types';


export const UPDATE_ME_MUTATION = gql`
    mutation updateMe($input: UpdateMeInput!){
        updateMe(input: $input){
            code
            success
            message
        }
    }
`;

export class UpdateMeForm extends React.Component {
    submit = async (values, actions, mutation) => {
        const payload = {
            input: {
                first_name: values.first_name,
                last_name: values.last_name
            }
        }
        const response = await SubMut(mutation, payload);
        const result = await MMR(response, 'updateMe');

        actions.setStatus({
            form: {
                success: result.success,
                code: result.code,
                message: result.message
            }
        })
        actions.setSubmitting(false);
    }

    render(){
        const { currentUser } = this.props;
        return(
            <Mutation mutation={UPDATE_ME_MUTATION}>
                {(mutation) => (
                    <Formik
                        initialValues={{
                            first_name: currentUser.first_name,
                            last_name: currentUser.last_name
                        }}
                        onSubmit={(values, actions) => this.submit(values,actions,mutation)}
                    >
                        {(props) => {
                            return(
                                <Form noValidate>
                                    <H1>Update Your Profile</H1>
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


UpdateMeForm.propTypes = {
    currentUser: PropTypes.object.isRequired
}