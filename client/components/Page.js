import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from './Util';
import styled from 'styled-components';
import { MainNavigation, SideNavigation } from './Util/Navigation';

export const PageBody = styled('div')``;
export const PageHeader = styled('header')``;
export const PageMain = styled('main')`
    min-height: calc(100vh - 290px);
`;
export const PageFooter = styled('footer')`
    padding: 100px 0px;
    background-color: ${props => props.theme.colors.black};
`;


export default class Page extends React.Component {
    
    render(){
        const { currentUser } = this.props;
        return(
        <PageBody>
            <PageHeader>
                <MainNavigation currentUser={currentUser}/>
            </PageHeader>

            <PageMain>
                {
                    this.props.SideNav ?
                    <Container bsPrefix="container-fluid h-100 no-gutters px-0">
                        <Row bsPrefix="row h-100 no-gutters">
                            <Col xs={12} md={3} xl={2}>
                                <SideNavigation Component={this.props.SideNav}/>
                            </Col> 
                            <Col xs={12} md={9} xl={10}>
                                {this.props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    <React.Fragment>
                        {this.props.children}
                    </React.Fragment>
                }
            </PageMain>

            <PageFooter>

            </PageFooter>

        </PageBody>
        )
    }
}

Page.propTypes = {
    currentUser: PropTypes.object
}