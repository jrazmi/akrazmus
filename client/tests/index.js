import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';
import { theme } from '../styles';


export const mockWrapper = (mocks, Component) => {
    let apolloClient;
    const wrapper = mount(
        <MockedProvider mocks={mocks}>
            <ThemeProvider theme={theme} addTypeName={false}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return Component;
                    }}
                </ApolloConsumer>
            </ThemeProvider>
        </MockedProvider>
    )
    return wrapper;
}



export { fakeUser } from './fakeUser';