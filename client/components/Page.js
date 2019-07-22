import React from 'react';
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from 'styled-components';
import { MainNavigation } from './Util/Navigation';

export const PageBody = styled('div')``;
export const PageHeader = styled('header')``;
export const PageMain = styled('main')``;
export const PageFooter = styled('footer')``;


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