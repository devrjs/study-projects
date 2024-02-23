import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${props => props.theme.COLORS.BACKGROUND};
        color: ${props => props.theme.COLORS.TX_DEFAULT};
        -webkit-font-smoothing: antialiased;
    }
    
`
