import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo'
import redirect from '../lib/redirect';
import { Meta } from '../lib/siteMeta';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import { theme, AddGlobals } from '../styles';

class Application extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};
        
        // pass in page specific props to app
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        //pass along query parameters
        if(ctx.query){
            pageProps.query = ctx.query;
        }
        
        // if Page or Auth HOC component returns a nextPage app should 
        // redirect user instead of displaying page.
        let nextPage = pageProps.nextPage;
        if(nextPage){
            redirect(ctx, `${nextPage}`)
        }
        return { pageProps };
    }

    render(){
        const { Component, pageProps, apolloClient } = this.props;

        return(
            <Container>
                <ApolloProvider client={apolloClient}>
                    <ThemeProvider theme={theme}>
                        <React.Fragment>
                            <Normalize/>
                            <Meta/>
                            <AddGlobals/>
                            <Component { ... pageProps }/>
                        </React.Fragment>
                    </ThemeProvider>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withApollo(Application);