import React from 'react';
import { GetCurrentUser } from '../../queries';
import { CurrentUser } from '../../lib/constructors';
import { Site } from '../../lib/siteConfig';


// currently takes in array of permissions
// if the user has any of the permissions they will be authorized
// needs refactor for multiple permissions constraint
export const withGlobalAuth = (Component, perms) => {
    return class GAComponent extends React.Component {
        static async getInitialProps({
            ...ctx
        }) {
            let nextPage;
            let authed = false;
            const { currentUser } = await GetCurrentUser(ctx.apolloClient);

            //redirect to login page without current user
            if(!currentUser || !currentUser.me) {
                nextPage = `${Site.routes.auth.login}?next=${ctx.req.url}`
            }


            //iterate over the provided permissions and look to see if current user class has that permission
            const authedUser = CurrentUser(currentUser);
            if(perms.length > 0){
                perms.forEach((perm) => {
                    if(authedUser && authedUser.hasGlobalPermission(perm)){
                        authed = true;
                    }
                })
            }

            // if user is not authed return to homepage
            if(!authed){
                nextPage = '/'
            }

            // return props if nextpage not set user will be allowed through
            return { currentUser, nextPage };
        }
        render() {
            return <Component {...this.props}/>;
        }
    }
}