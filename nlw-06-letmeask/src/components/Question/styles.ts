import styled from "styled-components"

export const StyledQuestion = styled.div`
  margin-bottom: 8px;
  padding: 24px;
  background: var(--details);
  box-shadow: 0 2px 12px hsla(0, 0%, 0%, 0.14);
  border-radius: 8px;

  &.highlighted {
    background: var(--question-highlighted);
    border: 1px solid var(--purple);

    footer .user-info span {
      color: var(--black);
    }
  }

  &.answered {
    background: var(--gray-light);
  }

  p {
    color: var(--black);
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        margin-left: 8px;
        font-size: 14px;
        color: var(--gray-dark);
      }
    }

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      background: transparent;
      border: 0;
      cursor: pointer;
      transition: color 0.2s;
      color: var(--gray-dark);

      &.like-button {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        color: var(--gray-dark);

        &.liked {
          color: var(--purple);
        }
      }
    }

    button:hover {
      color: var(--purple);
    }
  }
`
