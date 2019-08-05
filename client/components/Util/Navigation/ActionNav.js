import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav'

export const ActionNav = styled(Nav)`
    .nav-link {
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 10px 10px;
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.tertiary};
    border: 1px solid ${props => props.theme.colors.g2};
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        cursor: pointer;
    }
    span {
        display: inline-block;
        height: 10px;
        width: 10px;
        position: relative;
        margin-right: 5px;
        svg {
            position: absolute;
            height: 100%;
      
        }
    }
    }

   
`

export const ActionNavButton = styled('button')`
      -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    padding: 15px 10px;
    
    background-color: ${props => props.theme.colors.g0};
    color: ${props => props.theme.colors.tertiary};
    border: 1px solid ${props => props.theme.colors.g2};
    text-transform: uppercase;
    font-weight: 700;
    font-size: .8rem;
    font-family: ${props => props.theme.fonts.body};
    &:hover,
    &:active,
    &:focus {
        background-color: ${props=>props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        cursor: pointer;
    }
    span {
        display: inline-block;
        height: 10px;
        width: 10px;
        position: relative;
        margin-right: 5px;

        svg {
            position: absolute;
            height: 100%;
      
        }
    }
   
`;