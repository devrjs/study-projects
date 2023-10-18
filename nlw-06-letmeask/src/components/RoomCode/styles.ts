import styled from "styled-components"

export const StyledRoomCode = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  overflow: hidden;
  background: var(--background);
  border: 1px solid var(--purple);
  border-radius: 8px;
  cursor: pointer;

  div {
    display: flex;
    padding: 12px;
    background: var(--purple);
    color: var(--details);
  }

  span {
    display: block;
    flex: 1;
    align-self: center;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--black);
  }
`
