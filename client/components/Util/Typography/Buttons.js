import styled from 'styled-components';

const Button = styled('button')`
    position: relative;
    padding: 10px 30px;
    min-height: 40px;
    text-transform: uppercase;
    border: none;
    font-weight: 700;
    ${({full}) => full && `width: 100%;`};
    ${({small}) => small && `font-size: .8rem;`}; 
    span {
        display: inline-block;
        height: 15px;
        width: 15px;
        position: relative;
        margin-right: 5px;
        margin-left: -15px;
        cursor: pointer;

        svg {
            position: absolute;
            height: 100%;
      
        }
    }
`;


export const PrimaryButton = styled(Button)`
    background-color: ${props=>props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.secondary};
    }
`;

export const SecondaryButton = styled(Button)`
    background-color: ${props=>props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    :hover,
    :focus {
        background-color: ${props=>props.theme.colors.tertiary};
    }

`;