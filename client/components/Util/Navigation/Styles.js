import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const MainNavbar = styled(Navbar)`
    background: ${props => props.theme.colors.g2};
`;

export const Brand = styled(Navbar.Brand)`
    width: 150px;
    padding: 0;
    display: block;
    margin: 5px 0px;
    @media(min-width: 768px){
        width: 300px;
    }
    img { width: 100%; height: auto;}
`;

export const MainNav = styled(Nav)`
    .nav-link {
        text-transform: uppercase;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        color: ${props => props.theme.colors.black} !important;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.secondary} !important;
            cursor: pointer;
        }

   }
`;

export const NavDrop = styled(NavDropdown)`
    .dropdown-menu {
        left: auto !important;
        right: 0;
        top: 58px;
        border-radius: 0px;
        border: none;
        background-color: ${props => props.theme.colors.g2};
        .dropdown-item {
        text-transform: uppercase;
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
        color: ${props => props.theme.colors.black} !important;
        &:hover,
        &:focus,
        &:active {
            color: ${props => props.theme.colors.secondary} !important;
            cursor: pointer;
            background-color: ${props => props.theme.colors.g1};
        }
    }
    }
`