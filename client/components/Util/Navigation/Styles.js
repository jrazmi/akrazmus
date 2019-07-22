import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
    
`;

