import { RegisterForm, REGISTER_MUTATION } from '../RegisterForm';
import { mockWrapper, fakeUser } from '../../../tests';
import wait from 'waait';
import Router from 'next/router';

Router.router = { replace() {}};



describe('<RegisterForm/>', () => {
    it('it requires email and password', async () => {
        const wrapper = mockWrapper([], <RegisterForm/>);
        wrapper.find('form').simulate('submit');
        await wait(0);
        wrapper.update();

        const EmailError = wrapper.findWhere(c=>c.name() === 'TextField' && c.prop('id') === 'email').find('Styles__ErrorContainer');
        expect(EmailError.exists()).toBe(true);

        const PasswordError = wrapper.findWhere(c=>c.name() === 'TextField' && c.prop('id') === 'password').find('Styles__ErrorContainer');
        expect(PasswordError.exists()).toBe(true);
    })
    it('it throws an error if a user already exists', async() => {
        const user = fakeUser();
        const mocks = [
            {
                request: {
                    query: REGISTER_MUTATION,
                    variables: {
                       input:{
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: 'foo',
                       }
                    }
                },
                result: {
                    data: {
                        register:{
                            __typename: 'RegisterInput',
                            code: "DUPLICATE",
                            success: false,
                            message: "Go Log In!",
                            token: null,
                            nextPage: null
                        }
                    }
                }
            }
        ]

        const wrapper = mockWrapper(mocks, <RegisterForm/>);
        wrapper.find('input[name="first_name"]').simulate('change', {target: {name: "first_name", value: user.first_name}});
        wrapper.find('input[name="last_name"]').simulate('change', {target: {name: "last_name", value: user.last_name}});
        wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: user.email}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "foo"}});
        wrapper.find('form').simulate('submit');

        await wait(200);
        wrapper.update();
        expect(wrapper.find('FormStatus__FormStatusContainer').prop('success')).toBe(false);

    });
    it('it registers a new user', async() => {
        const user = fakeUser();
        Router.router.replace = jest.fn();

        
        const mocks = [
            {
                request: {
                    query: REGISTER_MUTATION,
                    variables: {
                       input:{
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: 'foo',
                       }
                    }
                },
                result: {
                    data: {
                        register:{
                            __typename: 'RegisterInput',
                            code: "OK",
                            success: true,
                            message: "Go Log In!",
                            token: "token",
                            nextPage: null
                        }
                    }
                }
            }
        ]

        const wrapper = mockWrapper(mocks, <RegisterForm/>);
        wrapper.find('input[name="first_name"]').simulate('change', {target: {name: "first_name", value: user.first_name}});
        wrapper.find('input[name="last_name"]').simulate('change', {target: {name: "last_name", value: user.last_name}});
        wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: user.email}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: "foo"}});
        wrapper.find('form').simulate('submit');

        
        await wait(200);
        wrapper.update()

        expect(Router.router.replace).toHaveBeenCalled();


    });
   
})