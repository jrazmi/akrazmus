import { LoginForm, LOGIN_MUTATION } from '../LoginForm';
import { mockWrapper, fakeUser } from '../../../tests';
import wait from 'waait';


describe('<LoginForm/>', () => {
    it('it requires email and password', async () => {
        const submitIt = jest.fn();
        const wrapper = mockWrapper([], <LoginForm submitIt={submitIt}/>);
        const Form = wrapper.find('form');
        Form.simulate('submit');
        wrapper.update();
        await wait(0);
        expect(submitIt).not.toHaveBeenCalled();
    })
    it('it submits with a valid email and password', async() => {
        const submitIt = jest.fn();
        const user = fakeUser();

        const wrapper = mockWrapper([], <LoginForm submitIt={submitIt}/>);
        const Form = wrapper.find('form');

        Form.find('input[name="email"]').simulate('change',{
            target:{name:"email", value: user.email}
        })
        Form.find('input[name="password"]').simulate('change',{
            target:{name:"password", value: "foo"}
        })

        wrapper.update()
        await wait(0);

        Form.simulate('submit');
        wrapper.update();
        await wait(0);

        expect(submitIt).toHaveBeenCalled();


    });
})