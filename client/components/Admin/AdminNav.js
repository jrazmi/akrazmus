import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Site } from '../../lib/siteConfig';
export const AdminNav = (props) => {
    const { currentUser } = props; 

    return(
        <React.Fragment>
            {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={ Site.routes.admin.index }>
                    <Nav.Link href={ Site.routes.admin.index }>
                        Admin
                    </Nav.Link>
                </Link>
            }
             {currentUser.hasGlobalPermission('ADMIN') &&
                <Link href={ Site.routes.admin.users.index }>
                    <Nav.Link href={ Site.routes.admin.users.index }>
                        Users
                    </Nav.Link>
                </Link>
            }

        </React.Fragment>
    )
}

AdminNav.propTypes = {
    currentUser: PropTypes.object.isRequired
}