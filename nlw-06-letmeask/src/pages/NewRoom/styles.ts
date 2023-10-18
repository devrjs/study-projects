import styled from "styled-components"
import { StyledHome } from "../Home/styles"

export const StyledNewRoom = styled(StyledHome)`
  .main-content {
    h2 {
      margin: 64px 0 24px;
      font-family: "Poppins", sans-serif;
      font-size: 24px;
    }

    p {
      margin-top: 16px;
      font-size: 14px;
      color: var(--gray-dark);

      a {
        color: var(--pink-dark);
      }

      a:hover {
        filter: brightness(0.9);
      }
    }
  }
`
