import styled from 'styled-components';


const FormStatusContainer = styled('div')`
    padding: .75rem 1rem;
    background: white;
    margin: 1rem 0;
    border-left: 5px solid ${props => props.theme.colors.error};
    background-color: ${props => props.theme.colors.g1};
    p {
        margin: 0;
        font-weight: 100;
    }
    ${({ success, theme }) => success &&`
        border-left: 5px solid ${theme.colors.secondary};
    `}
`;

export const FormStatus = ({status}) => {
  return(
    <FormStatusContainer success={status.success}>
        <h3>{status.code.replace(/_/g, ' ')}</h3>
        <p>{status.message}</p>
    </FormStatusContainer>
  )
}