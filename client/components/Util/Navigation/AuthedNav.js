import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { NavDrop, MainNav } from './Styles';
import { Site } from '../../../lib/siteConfig';

export class AuthedNav extends React.Component {
    render(){
        const { currentUser } = this.props;
        return(
            <React.Fragment>
                {currentUser && currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={Site.routes.admin.index}>
                    <MainNav.Link href={Site.routes.admin.index}>
                        Admin
                    </MainNav.Link>
                </Link>
                }
                <NavDrop id="account" title="Account">
                    <Link href={Site.routes.account.profile}>
                        <NavDrop.Item href={Site.routes.account.profile}>
                            Settings
                        </NavDrop.Item>
                    </Link>
                    <Link href={Site.routes.auth.logout}>
                        <NavDrop.Item href={Site.routes.auth.logout}>
                            Logout
                        </NavDrop.Item>
                    </Link>
                </NavDrop>
            </React.Fragment>
        )
    }
}

AuthedNav.propTypes = {
    currentUser: PropTypes.object.isRequired
}