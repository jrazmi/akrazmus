import { InputContainer, Label, TextInput, ErrorContainer } from './Styles';

export const TextField = ({field, form: {touched, errors}, ...props}) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <InputContainer>
            {props.label && <Label htmlFor={field.name} id={`label-${field.name}`}>{props.label}</Label>}
            <TextInput error={errorMessage} {...field} {...props} />
            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}

        </InputContainer>
    )
}