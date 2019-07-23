import { LoginForm, LOGIN_MUTATION } from '../LoginForm';
import { mockWrapper, fakeUser } from '../../../tests';
import wait from 'waait';
import Router from 'next/router';

Router.router = { replace() {}};



describe('<LoginForm/>', () => {
    it('it requires email and password', async () => {
        const wrapper = mockWrapper([], <LoginForm/>);
        wrapper.find('form').simulate('submit');
        await wait(0);
        wrapper.update();

        const EmailError = wrapper.findWhere(c=>c.name() === 'TextField' && c.prop('id') === 'email').find('Styles__ErrorContainer');
        expect(EmailError.exists()).toBe(true);

        const PasswordError = wrapper.findWhere(c=>c.name() === 'TextField' && c.prop('id') === 'password').find('Styles__ErrorContainer');
        expect(PasswordError.exists()).toBe(true);
    })
    it('it throws an error for an invalid user', async() => {
        const user = fakeUser();
        const mocks = [
            {
                request: {
                    query: LOGIN_MUTATION,
                    variables: {
                        email: user.email,
                        password: 'foo'
                    }
                },
                result: {
                    data: {
                        requestLogin:{
                            __typename: 'User',
                            code: "DOES_NOT_EXIST",
                            success: false,
                            message: "Could not find matching user with these credentials",
                            token: null
                        }
                    }
                }
            }
        ]

        const wrapper = mockWrapper(mocks, <LoginForm/>);
        wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: user.email}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "foo"}});
        wrapper.find('form').simulate('submit');

        await wait(100);
        wrapper.update();
        expect(wrapper.find('FormStatus__FormStatusContainer').prop('success')).toBe(false);

    });
    it('it logs in a valid user', async() => {
        const user = fakeUser();
        Router.router.replace = jest.fn();

        
        const mocks = [
            {
                request: {
                    query: LOGIN_MUTATION,
                    variables: {
                        email: user.email,
                        password: 'foo'
                    }
                },
                result: {
                    data: {
                        requestLogin:{
                            __typename: 'User',
                            code: "OK",
                            success: true,
                            message: "Login Successful",
                            token: "token"
                        }
                    }
                }
            }
        ]

        const wrapper = mockWrapper(mocks, <LoginForm/>);
        wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: user.email}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "foo"}});
        wrapper.find('form').simulate('submit');

        await wait(100);
        expect(Router.router.replace).toHaveBeenCalled();


    });
   
})