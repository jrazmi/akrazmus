import styled from 'styled-components';

export const InputContainer = styled('div')`
    display: block;
    width: 100%;
    padding-bottom:.5rem;;
    margin-bottom: 1rem;
`;

export const Label = styled('label')`
    display: block;
    text-transform: uppercase;
    font-size: .75rem;
    padding-left: .5rem;
`;

export const TextInput = styled('input')`
    display: block;
    width: 100%;
    padding: .5rem;
    border: none;
    border-left: 3px solid ${props => props.theme.colors.g1};
    border-bottom: 2px solid ${props => props.theme.colors.g3};
    background: ${props => props.theme.colors.g1};
    :focus {
        background: ${props => props.theme.colors.g2};
        border-left: 3px solid ${props => props.theme.colors.g3};
        border-bottom: 2px solid ${props => props.theme.colors.g3};

    }
    ${({ error, theme }) => error && `
            border-left: 3px solid ${theme.colors.error};
            border-bottom: 2px solid ${theme.colors.error};
    `}
`;
export const ErrorContainer = styled('div')`
    display: block;
    position: absolute;
    text-transform: uppercase;
    font-size: .75rem;
    padding-left: .5rem;
    color: ${props => props.theme.colors.error};
`;