import React from 'react';
import { Formik, Form, Field } from "formik";
import styled, {css} from 'styled-components';
import { Row, Col } from '../Layout';
import { TextField } from '../Forms';
import { SecondaryButton } from '../Typography'
import * as Yup from "yup";
import  Router  from "next/router";

const StyledForm = styled(Form)`
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
      ${({dis}) => dis && css`
          opacity: .5;
          pointer-events: none;
      `}
`

const SearchValidation = Yup.object().shape({
  quick_search: Yup.string().required('Required'),
})

export class QuickFilters extends React.Component {
  submit = async (values, actions, perPage) => {
    let nextPath = `${this.props.path}?page=1&perpage=${perPage}&q=${values.quick_search}`
    actions.resetForm({quick_search: values.quick_search});
    Router.push(nextPath);
  }
  render(){
    const {currentQuery, hasAdvancedQuery, perPage } = this.props;

    return(
      <Formik
        validationSchema={SearchValidation}
        onSubmit={ async (values, actions) => this.submit(values, actions, perPage)}
        initialValues={
          {
            quick_search: currentQuery.quick_search ? currentQuery.quick_search : ""
          }
        }
        render={props => {
          return(
            <StyledForm noValidate dis={hasAdvancedQuery ? 1 : 0}>
                <Row>
                  <Col md={3}>
                    <SecondaryButton type="submit" full disabled={props.isSubmitting || hasAdvancedQuery}>Go!</SecondaryButton>
                  </Col>
                  <Col md={9}>
                        <Field 
                          disabled={hasAdvancedQuery}
                          id="quick_search" 
                          name="quick_search"
                          label="Quick Search"
                          labelBelow
                          placeHolder="Quick Search"
                          type="text"
                          component={TextField}
                        />
                  </Col>
                </Row>
            </StyledForm>
          )
        }}
      /> 
    )
  }
}