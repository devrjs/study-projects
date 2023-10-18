import styled from "styled-components"

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 0 32px;
  background: var(--purple);
  color: var(--details);
  font-weight: 500;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  img {
    margin-right: 8px;
  }

  &.outlined {
    background: var(--background);
    color: var(--purple);
    border: 1px solid var(--purple);
  }

  &.outlined:hover {
    color: var(--hover-purple);
    border: 1px solid var(--hover-purple);
  }

  &:not(:disabled, .outlined):hover {
    background: var(--hover-purple);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
