import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MainNavbar, Brand, MainNav } from './Styles';
import { Site } from '../../../lib/siteConfig';
import { AnonNav } from './AnonNav';
import { AuthedNav } from './AuthedNav';


export const MainNavigation = (props) => {
    const { currentUser } = props;
    return(
        <MainNavbar expand="lg">
            <Link href="/">
                <Brand href={'/'}>
                    <img src={'/static/img/akrazmi.png'} alt={Site.meta.title} />
                </Brand>
            </Link>

                <MainNavbar.Collapse id="main-nav">
                        <MainNav className="ml-auto">
                            {!currentUser && <AnonNav/>}
                            {currentUser && <AuthedNav currentUser={currentUser}/>}
                        </MainNav>
                </MainNavbar.Collapse>

        </MainNavbar>
    )
}
MainNavigation.propTypes = {
    currentUser: PropTypes.object
}