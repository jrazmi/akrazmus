import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SideNavbar, SideNav } from './Styles';


const SideNavContainer = styled('div')`
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background: ${props => props.theme.colors.tertiary};
    @media (min-width: 1200px){
        min-height: 80vh;
    }

`;
export const SideNavigation = ({...props}) => {
    return(
        <SideNavContainer>
            <SideNavbar expand="md">
                <SideNavbar.Toggle bsPrefix={'navbar-toggler ml-auto'} aria-controls="sidenav" label={'Menu'}> Dash Menu </SideNavbar.Toggle>
                <SideNavbar.Collapse id='sidenav'>
                    <SideNav className="flex-column">
                            {props.Component}
                  
                    </SideNav>
                </SideNavbar.Collapse>
            </SideNavbar>
        </SideNavContainer>
    )
}
SideNavigation.propTypes = {
    Component: PropTypes.element
}