import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from "formik";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { TextField, FormError, PrimaryButton } from '../Util';
import { MMR, SubMut } from '../../lib/Util';

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


// pass submit function for tests
export const LoginFormSubmit = async (values, actions, mutation) => {
    const payload = {
        email: values.email,
        password: values.password
    };
    const response = await SubMut(mutation, payload);
    const result = await MMR(response, 'requestLogin');
    
    if(!result.success){
        actions.setStatus({
            form: {
                code: result.code,
                message:result.message
            }
        });
        return;
    }
    
}


// field validation 
export const LoginValidation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
        .required('Required')
  });



export const LoginForm = (props) => {
    const { submitIt } = props;
    return(
        <Mutation mutation={LOGIN_MUTATION}>
            {(mutation, { data, loading, error}) => (
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={LoginValidation}
                    onSubmit={ async (values,actions) => submitIt(values, actions, mutation)}
                >
                    {(props) =>{
                        return(
                            <Form noValidate>
                                {props.status && 
                                    props.status.form &&
                                        props.status.form.code != 'Success' &&
                                            <FormError error={props.status.form}/>
                                        
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

LoginForm.propTypes = {
    submitIt: PropTypes.func.isRequired
}