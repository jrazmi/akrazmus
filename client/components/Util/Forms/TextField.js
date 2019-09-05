import { InputContainer, Label, TextInput, ErrorContainer } from './Styles';

export const TextField = ({field, form: {touched, errors}, ...props}) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <InputContainer labelBelow={props.labelBelow ? 1 : 0}>
            {props.label && !props.labelBelow && <Label htmlFor={field.name} id={`label-${field.name}`}>{props.label}</Label>}
            <TextInput error={errorMessage} {...field} {...props} />
            {props.label && props.labelBelow && <Label  htmlFor={field.name} id={`label-${field.name}`}>{props.label}</Label>}
            {errorMessage && <ErrorContainer labelBelow={props.labelBelow ? 1 : 0}>{errorMessage}</ErrorContainer>}

        </InputContainer>
    )
}