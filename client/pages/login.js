import React from 'react';
import Page from '../components/Page';
import { GetCurrentUser } from '../queries';
import { CurrentUser } from '../lib/constructors';
import { parseCookies } from 'nookies';
import { Container, Row, Col, Box } from '../components/Util';
import { LoginForm } from '../components/Auth';

export default class Login extends React.Component {
    static async getInitialProps ({...ctx}){
        let currentUser;
        let nextPage;

        // if token exists send a get current user query
        const cookies = parseCookies(ctx);
        if(cookies.token){
            currentUser  = await GetCurrentUser(ctx.apolloClient);
        }
        
        return { currentUser, nextPage };
    }
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser}>
                <Container>
                    <Row bsPrefix={"row justify-content-center py-5"}>
                        <Col md={6}>
                            <Box>
                                <LoginForm />

                            </Box>
                        </Col>
                    </Row>
                </Container>
            </Page>
        )
    }
}