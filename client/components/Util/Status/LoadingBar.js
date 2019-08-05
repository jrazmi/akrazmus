import styled, { keyframes, css } from 'styled-components';

export const ANIMLoading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;
export const LoadingBarC = styled('div')`
    margin: 0rem;
    height: 10px;
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.black} 50%, ${props => props.theme.colors.primary} 100%);
    ${({loading}) => loading && css`
        background-size: 50% auto;
        animation: ${ANIMLoading} 0.75s linear infinite;
    `}
`;

export const LoadingBar = (props) => (
    <LoadingBarC {...props}/>
)