import { ResetPasswordForm, RESET_PASSWORD_MUTATION } from '../ResetPasswordForm';
import { mockWrapper, fakeUser } from '../../../tests';
import wait from 'waait';
import Router from 'next/router';

Router.router = { replace() {}};
describe('<ResetPasswordForm/>', () => {
    it('it doesnt submit without a password input', async () => {
        const wrapper = mockWrapper([], <ResetPasswordForm token="blah"/>);
        wrapper.find('form').simulate('submit');
        await wait(0);
        wrapper.update();

        const ErrorContainer = wrapper.find('Styles__ErrorContainer');
        expect(ErrorContainer.text()).toContain('required');
    
    });

    it('it returns an expired error for an invalid token', async () => {
        const mocks = [
            {
                request: {
                    query: RESET_PASSWORD_MUTATION,
                    variables: {
                        password: "foo",
                        token: "foo"
                    }
                },
                result: {
                    data: {
                        resetPassword: {
                            __typename: 'BasicMutationResponse',
                            code: "EXPIRED",
                            message: "foo",
                            success: false
                        }
                    }
                }
            }
        ];

        const wrapper = mockWrapper(mocks, <ResetPasswordForm token={'foo'}/>);
        wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: 'foo'}});
        wrapper.find('form').simulate('submit');

        await wait(100);
        wrapper.update();
        expect(wrapper.find('FormStatus__FormStatusContainer').prop('success')).toBe(false);
    });

    it('it returns success for valid token', async () => {
        Router.router.replace = jest.fn();

        const mocks = [
            {
                request: {
                    query: RESET_PASSWORD_MUTATION,
                    variables: {
                        password: "foo",
                        token: "foo"
                    }
                },
                result: {
                    data: {
                        resetPassword: {
                            __typename: 'BasicMutationResponse',
                            code: "OK",
                            message: "foo",
                            success: true
                        }
                    }
                }
            }
        ];

        const wrapper = mockWrapper(mocks, <ResetPasswordForm token={'foo'}/>);
        wrapper.find('input[name="password"]').simulate('change', {target: {name: "password", value: 'foo'}});
        wrapper.find('form').simulate('submit');

        await wait(100);
        wrapper.update();

        expect(Router.router.replace).toHaveBeenCalled();

    });

});

