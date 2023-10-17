import styled from "styled-components"

export const StyledThemeButton = styled.div`
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 40px;
    width: 83px;
    padding: 5px;
    background: ${({ theme }) => theme.COLORS.BACKGROUND};
    border: solid 2px ${({ theme }) => theme.COLORS.ELEMENTS};
    border-radius: 100px;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
    }

    .ball {
      position: absolute;
      top: 2px;
      left: 2px;
      height: 32px;
      width: 34px;
      background: ${({ theme }) => theme.COLORS.ELEMENTS};
      border-radius: 100px;
      transform: translateX(0px);
      transition: transform 0.2s linear;
    }
  }

  input:checked ~ .ball {
    transform: translateX(40px);
  }
`
