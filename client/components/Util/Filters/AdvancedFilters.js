import React from 'react';
import PropTypes from 'prop-types';

import { Formik, Form, FieldArray } from "formik";
import styled, {css} from 'styled-components';
import { Row, Col } from '../Layout';
import { TextField } from '../Forms';
import { SecondaryIconButton, PrimaryButton } from '../Typography';
import { AndContainer } from './Styles';
import { FilterFields } from './FilterFields';

export class AdvancedFilters extends React.Component {
  render(){
    const { currentQuery, filters } = this.props;
    console.log(currentQuery)
    return(
      <Formik
      initialValues={
        {
          OR: currentQuery.OR ? currentQuery.OR : [{'AND':[]}],
          sortBy: currentQuery.sortBy,
          sortOrder: currentQuery.sortOrder
        }
      }
      render={(props) => {
        return(
          <Form noValidate>
            <Row>
              <Col md={12}>
                <FieldArray 
                  name="OR"
                  render={arrayHelpers => {
                    if(props.values && props.values.OR && props.values.OR.length > 0) {
                      return(
                        <React.Fragment>
                          {props.values.OR.map((clause, idx) => {
                            return(
                              <AndContainer key={idx}>
                                  <FilterFields 
                                      errors={props.errors} 
                                      fieldVals={props.values} 
                                      idx={idx} 
                                      name={`OR.${idx}.AND`} 
                                      filters={filters} 
                                      parentHelpers={arrayHelpers}
                                    />

                                  <SecondaryIconButton className="or-button"  onClick={() => arrayHelpers.push(
                                        {
                                          "AND": 
                                              [{key:"", op:"", val:""}]
                                        }
                                  )}>
                                    <span>OR</span>
                                  </SecondaryIconButton>
                              </AndContainer>
                            )
                          })}
                        <PrimaryButton type="submit"> Submit</PrimaryButton>


                        </React.Fragment>
                      )
                    }
                    return(
                      <PrimaryButton onClick={() => arrayHelpers.push(
                        {
                          "AND": 
                              [{key:"", op:"", val:""}]
                        }
                        )}>
                        Add Filter
                      </PrimaryButton>
                    )
                  }}
                />
              </Col>
            </Row>
          </Form>
        )
      }}
      />
    )
  }
}

AdvancedFilters.propTypes = {
  currentQuery: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired
}