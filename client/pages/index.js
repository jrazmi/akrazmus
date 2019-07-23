import React from 'react';
import Page from '../components/Page';
import { GetCurrentUser } from '../queries';
import { CurrentUser } from '../lib/constructors';
import { parseCookies } from 'nookies';

export default class Index extends React.Component {
    static async getInitialProps ({...ctx}){
        let currentUser;
        let nextPage;

        const cookies = parseCookies(ctx);
        if(cookies.token){
            ({ currentUser } = await GetCurrentUser(ctx.apolloClient));
        }
        return { currentUser, nextPage };
    }
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser}>
                <h1>Home</h1>
            </Page>
        )
    }
}