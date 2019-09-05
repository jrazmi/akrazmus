import _ from "lodash";
import { StringWhereOptions, BooleanWhereOptions } from './WhereOptions';
import { SelectField } from '../Forms';

import { Field } from "formik";

export const OperationField = ({idx, subidx, name, fieldVals, filters}) => {
    let compareValue = fieldVals.OR[idx].AND[subidx].key;
    let compareType = _.find(filters, { value: compareValue});
    if(compareValue && compareType && compareType.type) {
        switch(compareType.type){
            case "StringWhere":
                return(
                    <Field 
                          id={`${name}-${subidx}-op`} 
                          label={"Operation"} 
                          name={`${name}.${subidx}.op`}
                          options={StringWhereOptions}
                          placeholderOption="-- Select --"
                          component={SelectField}
                    />
                )
                break;
            case "BooleanWhere":
                return(
                    <Field 
                        id={`${name}-${subidx}-op`} 
                        label={"Operation"} 
                        name={`${name}.${subidx}.op`}
                        placeholderOption="-- Select --"
                        options={BooleanWhereOptions}
                        component={SelectField}
                    />
                )
                break;
            default:
            break;
        }
    }
    return null;

}