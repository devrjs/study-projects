import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    :root {
        --black: #29292E;
        --shadow: #050206;
        --purple: #835AFD;
        --danger: #E73F5D;
        
        --hover-purple: #6F4BD8;
        --hover-danger: #D73754;
        --hover-gray-medium: #7E7E86;
        --hover-gray-light: #CECECE;

        --background: #F8F8F8;
        --details: #FEFEFE;
        --question-highlighted: #F4F0FF;
        --divider: #E2E2E2;
        --gray-dark: #737380;
        --gray-medium: #A8A8B3;
        --gray-light: #DBDCDD;
        --pink-dark: #E559F9;
        --pink-light: #D67EE2;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: var(--background);
        color: var(--black);
        -webkit-font-smoothing: antialiased;
    }

    body,
    input,
    button,
    textarea {
        font: 400 16px 'Roboto', sans-serif;
    }
`
