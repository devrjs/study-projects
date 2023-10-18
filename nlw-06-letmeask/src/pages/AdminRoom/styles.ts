import styled from "styled-components"
import { StyledRoom } from "../Room/styles"

export const StyledAdminRoom = styled(StyledRoom)`
  .content {
    > div {
      display: flex;
      gap: 16px;

      button {
        height: 40px;
      }
    }
  }
`
