import React from 'react';
import Page from '../components/Page';
import { GetCurrentUser } from '../queries';
import { CurrentUser } from '../lib/constructors'
export default class Index extends React.Component {
    static async getInitialProps ({...ctx}){
        const { currentUser } = await GetCurrentUser(ctx.apolloClient);
        let nextPage;
        console.log(currentUser);
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