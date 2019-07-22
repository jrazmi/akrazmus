import { MainNavigation } from '../MainNavigation';
import { shallow } from 'enzyme';
import { fakeUser } from '../../../../tests';

describe('<MainNavigation/>', () => {
    it('It renders a bootstrap navbar with brand with alt text', async() =>{
        const wrapper = shallow(<MainNavigation currentUser={null}/>);
        const Brand = wrapper.find('Styles__Brand');
        expect(Brand.exists()).toBe(true);
        const BrandLogo = Brand.find("img");
        expect(BrandLogo.prop('alt').length).toBeGreaterThan(0);
    });
    it('It renders an anonymous navigation when currentUser not provided', async() => {
        const wrapper = shallow(<MainNavigation currentUser={null}/>);
        expect(wrapper.find('AnonNav').exists()).toBe(true);
    })
    it('It renders an authenticated navigation when currentUser is provided', async() => {
        const wrapper = shallow(<MainNavigation currentUser={fakeUser()}/>);
        expect(wrapper.find('AuthedNav').exists()).toBe(true);
    })
})