import React from "react";
import Page from "../components/Page";
import { H1, Box, Container, Row, Col } from "../components/Util";
import { destroyCookie } from "nookies";
import redirect from "../lib/redirect";

class Logout extends React.Component {
    static async getInitialProps({...ctx}) {
        destroyCookie(ctx, 'token');
        ctx.apolloClient.cache.reset().then(() => {
            // Redirect to a more useful page when signed out
            redirect({}, '/')
        })
        return {};
    }

    render(){
        return(
            <Page>
                <Container>
                    <Row bsPrefix={'row justify-content-center'}>
                        <Col md={6}>
                            <Box>
                                <H1> You have logged out.</H1>
                            </Box>
                        </Col>
                    </Row>
                </Container>
            </Page>
        )
    }
}

export default Logout