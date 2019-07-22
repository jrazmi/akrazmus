import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from './Util';
import styled from 'styled-components';
import { MainNavigation } from './Util/Navigation';

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
                <Container>
                    <Row>
                        <Col>
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
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