import styled from 'styled-components';

export const AndContainer = styled('div')`
    border-bottom: 5px solid ${props => props.theme.colors.g2};
    border-top: 5px solid ${props => props.theme.colors.g2};
    padding: 15px;
    margin-bottom: 30px;
    .or-button {
        position: absolute;
        bottom: 50px;
    }
`;