import * as Card from '../../Util/Layout/Card';
import Link from 'next/link';
import { Site } from '../../../lib/siteConfig';

export const AdminUserCard = (props) => {
    const { user } = props;
    return(
        <Card.Card>
            <Card.CardHeader>
                <Link href={Site.routes.admin.users.detail}>
                    <Card.CardHeadLink href={Site.routes.admin.users.detail}>
                        Profile
                    </Card.CardHeadLink>
                </Link>
            </Card.CardHeader>
            <Card.CardInner>
                <Card.CardTitle>
                    {user.first_name} {user.last_name}
                </Card.CardTitle>
            </Card.CardInner>
        </Card.Card>
    )
}