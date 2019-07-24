import { UpdateMeForm, UPDATE_ME_MUTATION } from '../UpdateMeForm';
import { mockWrapper, fakeUser } from '../../../tests';
import wait from 'waait';


describe('<UpdateMeForm/>', () => {
    it('it auto fills form with intialvalues and submits an update', async () => {
        const user = fakeUser();
        const mocks = [
            {
                request: {
                    query: UPDATE_ME_MUTATION,
                    variables: {
                        input: {
                            first_name: "foo",
                            last_name: "baz"
                        }
                    }
                },
                result: {
                    data: {
                        updateMe: {
                            __typename: 'BasicMutationResponse',
                            code: "OK",
                            success: true,
                            message: "Profile updated"
                        }
                    }
                }
            }
        ];
        const wrapper = mockWrapper(mocks, <UpdateMeForm currentUser={user}/>);
        expect(wrapper.find('input[name="first_name"]').prop('value')).toEqual(user.first_name);
        
        wrapper.find('input[name="first_name"]').simulate('change', {target: {name: "first_name", value: "Foo"}});
        wrapper.find('form').simulate('submit');

        await wait(100);
        wrapper.update()
        expect(wrapper.find('FormStatus__FormStatusContainer').prop('success')).toBe(false);

    })
})