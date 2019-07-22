import { createGlobalStyle, css} from 'styled-components';

export const theme = {
    fonts: {
        title: "'Montserrat', Helvetica, sans-serif",
        body: "'Roboto', Helvetica, sans-serif"
    },
    colors: {
        g0: "#FAFAFA",
        g1: "#f6f6f6",
        g2: "#eaeaea",
        g3: "#D7DADB",
        primary: "",
        secondary: "",
        tertiary: "",
        error: "",
        white: "#fff",
        black: "#36454f"
    },
}

export const GlobalStyle = css`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,900|Roboto:400,900&display=swap');
    
    
    body {
        font-family: ${theme.fonts.body};
        font-size: 18px;
        line-height: 1.65;
        font-weight: normal;
        background-color: ${theme.colors.g0};
    }
    *:focus {
        outline: none;
    }
    img {
        max-width: 100%;
    }
    a {
        
        color: ${theme.colors.tertiary};
        text-decoration: none;
        &:hover,
        &:focus,
        &:active {
            color: ${theme.colors.primary};
            cursor: pointer;
        }
    }

    button,
    a {
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    }

    h1,h2,h3,h4,h5,h6 {
        margin: 0;
        font-family: ${theme.fonts.title};
        font-weight: 900;
    }

    label,
    button {
        font-family: ${theme.fonts.title};
        font-weight: 900;
    }
    
    fieldset {
            border: none;
            padding: 0;
    }
`;

export const AddGlobals = createGlobalStyle`
    ${GlobalStyle};
`;