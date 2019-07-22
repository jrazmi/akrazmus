import styled from 'styled-components';

export const PrimaryButton = styled('button')`
    position: relative;
    padding: 10px 30px;
    text-transform: uppercase;
    border: none;
    background-color: ${props=>props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    font-weight: 700;
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.secondary};
        cursor: pointer;
    }
`;