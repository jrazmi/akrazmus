import { RequestPasswordResetForm, REQUEST_PASSWORD_RESET_MUTATION } from '../RequestPasswordResetForm';
import { mockWrapper, fakeUser } from '../../../tests';
import wait from 'waait';

describe('<RequestPasswordResetForm/>', () => {
    it('It does not submit without an email input', async () => {
        const wrapper = mockWrapper([], <RequestPasswordResetForm/>);
        wrapper.find('form').simulate('submit');
        await wait(0);
        wrapper.update();

        const ErrorContainer = wrapper.find('Styles__ErrorContainer');
        expect(ErrorContainer.text()).toContain('required');

    });
    it('it returns an error with a non existent user', async () => {
        const user = fakeUser();
        const mocks = [
            {
                request: {
                  query: REQUEST_PASSWORD_RESET_MUTATION,
                  variables: {
                    email: user.email,
                    link: 'http://localhost/',
                  },
                },
                result: {
                  data: {
                    requestPasswordReset: {
                      __typename: 'BasicMutationResponse',
                      code: 'DOES_NOT_EXIST',
                      message: "foo",
                      success: false,
                    },
                  },
                },
              },
        ]

        const wrapper = mockWrapper(mocks, <RequestPasswordResetForm/>);
        
        wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: user.email}});
        wrapper.find('form').simulate('submit');

        // need to wait for async submit functions to run.
        await wait(100);
        wrapper.update();        
        expect(wrapper.find('FormStatus__FormStatusContainer').prop('success')).toBe(false);

    });

    it('it returns success message when correct user', async () => {
        const user = fakeUser();
        const mocks = [
            {
                request: {
                  query: REQUEST_PASSWORD_RESET_MUTATION,
                  variables: {
                    email: user.email,
                    link: 'http://localhost/',
                  },
                },
                result: {
                  data: {
                    requestPasswordReset: {
                      __typename: 'BasicMutationResponse',
                      code: 'OK',
                      message: "foo",
                      success: true,
                    },
                  },
                },
              },
        ]

        const wrapper = mockWrapper(mocks, <RequestPasswordResetForm/>);
        
        wrapper.find('input[name="email"]').simulate('change', {target: {name: "email", value: user.email}});
        wrapper.find('form').simulate('submit');

        // need to wait for async submit functions to run.
        await wait(100);
        wrapper.update();        
        expect(wrapper.find('FormStatus__FormStatusContainer').prop('success')).toBe(true);
    })
})