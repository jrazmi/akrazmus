import { shallow } from 'enzyme';
import { AnonNav } from '../AnonNav';
import { Site } from '../../../../lib/siteConfig';


describe("<AnonNav/>", () => {
    it("it renders a link to the login page", async () => {
        const wrapper = shallow(<AnonNav/>);
        const LoginLink = wrapper.find({href: `${Site.routes.public.login}`})
        
        // Links should have a next/link with a sub anchor with same href
        expect(LoginLink.length).toBe(2);
    
    });
})