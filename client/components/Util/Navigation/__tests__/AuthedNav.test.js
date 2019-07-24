import { AuthedNav } from '../AuthedNav';
import { fakeUser } from '../../../../tests';
import { shallow } from 'enzyme';
import { Site } from '../../../../lib/siteConfig';
import { UserObject } from '../../../../lib/constructors/UserConstructor';

describe('<AuthedNav/>', () => {
    it('it renders an account dropdown when passed a user object', async () => {
        const user = fakeUser();
        const currentUser = new UserObject(user);

        const wrapper = shallow(<AuthedNav currentUser={currentUser}/>);
        
        const AccountNav = wrapper.findWhere(c=>c.name() === 'Styles__NavDrop' && c.prop('title') === 'Account');
        expect(AccountNav.exists()).toBe(true);

        //should have 2 - Next Router Link with sub link
        const ProfileLink = wrapper.find({href: `${Site.routes.account.settings}`});
        expect(ProfileLink.length).toBe(2);

        const LogoutLink = wrapper.find({href: `${Site.routes.auth.logout}`});
        expect(LogoutLink.length).toBe(2);
    });
    it('it does not render an admin link if the user does not have admin permission', async () => {
        const user = fakeUser();
        const currentUser = new UserObject(user);

        const wrapper = shallow(<AuthedNav currentUser={currentUser}/>);

        const AdminLink = wrapper.find({href: `${Site.routes.admin.index}`});
        expect(AdminLink.exists()).toBe(false);
    });
    it('it renders an admin link when a user has global ADMIN permissions', async () => {
        const user = fakeUser();
        user.globalPermissions = ['ADMIN'];
        const currentUser = new UserObject(user);
        const wrapper = shallow(<AuthedNav currentUser={currentUser}/>);

        const AdminLink = wrapper.find({href: `${Site.routes.admin.index}`});
        expect(AdminLink.exists()).toBe(true);
    });
})