import Link from 'next/link';
import { Site } from '../../../lib/siteConfig';
import { MainNav } from './Styles';

export const AnonNav = (props)=> {
    return (
        <React.Fragment>
            <Link href={`${Site.routes.public.login}`}>
                <MainNav.Link href={`${Site.routes.public.login}`}>
                    Login
                </MainNav.Link>
            </Link>
        </React.Fragment>
    )
}

