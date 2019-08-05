import { SearchInputContainer, Label, TextInput, ErrorContainer } from './Styles';

export const SearchTextField = ({field, form: {touched, errors}, ...props}) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <SearchInputContainer>
            <TextInput error={errorMessage} {...field} {...props} />
            {props.label && <Label htmlFor={field.name} id={`label-${field.name}`}>{props.label}</Label>}
            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}

        </SearchInputContainer>
    )
}