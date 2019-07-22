import styled from 'styled-components';


const ErrorStyles = styled('div')`
    padding: .75rem 1rem;
    background: white;
    margin: 1rem 0;
    border-left: 5px solid ${props => props.theme.colors.error};
    background-color: ${props => props.theme.colors.g1};
    p {
        margin: 0;
        font-weight: 100;
    }
`;

export const FormError = ({error}) => {
  return(
    <ErrorStyles>
        <h3>{error.code.replace(/_/g, ' ')}</h3>
        <p>{error.message}</p>
    </ErrorStyles>
  )
}