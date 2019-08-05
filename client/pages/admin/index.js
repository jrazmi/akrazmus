import React from 'react';
import Page from '../../components/Page';
import { CurrentUser } from '../../lib/constructors';
import { withGlobalAuth } from '../../components/HOC/withGlobalAuth';
import { AdminNav } from '../../components/Admin';
class AdminIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page 
                currentUser={currentUser} 
                SideNav={<AdminNav currentUser={currentUser}/>}
            >
                
                <h1>Admin</h1>
            </Page>
        )
    }
}

export default withGlobalAuth(AdminIndex, ['ADMIN']);