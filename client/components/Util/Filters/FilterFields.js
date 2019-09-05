import { FieldArray, Field } from "formik";
import { Row, Col } from "../Layout";
import { SelectField } from '../Forms';
import { ValueField } from './ValueField';
import { OperationField } from './OperationField';
import { PrimaryIconButton, TertiaryIconButton } from '../Typography';
import {DeleteForever} from 'styled-icons/material/DeleteForever';
import { PlusCircle } from 'styled-icons/boxicons-solid/PlusCircle';

export const FilterFields = ({ fieldVals, idx, name, filters, parentHelpers}) => {
    const filterVals = fieldVals.OR[idx].AND;
    if(filterVals && filterVals.length > 0){
        return(
            filterVals.map((subClause, subidx) => {
                return(
                    <FieldArray 
                        key={subidx}
                        name={name}
                        render={subArrayHelpers =>(
                            <Row bsPrefix="row justify-content-center align-items-center">
                                <Col md={3}>
                                    <Field
                                        id={`${name}-${subidx}-key`}
                                        label={"Key"}
                                        options={filters}
                                        name={`${name}.${subidx}.key`}
                                        placeholderOption="-- Select --"
                                        component={SelectField}
                                    />
                                </Col>
                                <Col md={2}>
                                    <OperationField 
                                        subidx={subidx}
                                        name={name}
                                        fieldVals={fieldVals}
                                        idx={idx}
                                        filters={filters}
                                    />
                                </Col>
                                <Col md={3}>
                                    <ValueField 
                                        subidx={subidx}
                                        name={name}
                                        fieldVals={fieldVals}
                                        idx={idx}
                                        filters={filters}
                                    />
                                </Col>

                                <Col md={4}>
                                <PrimaryIconButton onClick={() => subArrayHelpers.push({key:"", op:"", val:""})}> <span>AND</span> </PrimaryIconButton>
                                {
                                    filterVals.length > 1
                                    ?
                                    <TertiaryIconButton onClick={() => subArrayHelpers.remove(subidx)}><DeleteForever/></TertiaryIconButton>
                                    :
                                    <TertiaryIconButton onClick={() => parentHelpers.remove(idx)}><DeleteForever/></TertiaryIconButton>
                                    
                                }

                                </Col>
                            </Row>
                        )}

                    />
                )
            })
        )
    }
    return null;
    
}