import React from 'react';
import Page from '../components/Page';
import { GetCurrentUser } from '../queries';
import { CurrentUser } from '../lib/constructors';
import { parseCookies } from 'nookies';
import { Container, Row, Col, Box } from '../components/Util';
import { UpdateMeForm } from '../components/Auth';
import redirect from '../lib/redirect';

export default class Me extends React.Component {
    static async getInitialProps ({...ctx}){
        let currentUser;
        let nextPage;

        const cookies = parseCookies(ctx);
        if(cookies.token){
            currentUser  = await GetCurrentUser(ctx.apolloClient);
        }
        if(!currentUser) {
            nextPage = "/"
        }
        
        return { currentUser, nextPage };
    }
    render(){
        const currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser}>
                <Container>
                    <Row bsPrefix={"row justify-content-center py-5"}>
                        <Col md={6}>
                            <Box>
                                <UpdateMeForm currentUser={currentUser} />

                            </Box>
                        </Col>
                    </Row>
                </Container>
            </Page>
        )
    }
}