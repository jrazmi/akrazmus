import styled from 'styled-components';


export const Box = styled('div')`
    background: ${props => props.theme.colors.white};
    padding: 30px;
    width: 100%;
    border: 1px solid ${props => props.theme.colors.g2};
    border-bottom: 2px solid ${props => props.theme.colors.g2};
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.black};
`;