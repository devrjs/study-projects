import styled from "styled-components"

export const StyledHome = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    display: flex;
    flex: 7;
    justify-content: center;
    flex-direction: column;
    padding: 120px 80px;
    background: var(--purple);
    color: var(--details);

    img {
      width: 315px;
      height: auto;
      max-width: 320px;
    }

    strong {
      margin-top: 16px;
      font: 700 36px "Poppins", sans-serif;
      line-height: 42px;
    }

    p {
      margin-top: 16px;
      font-size: 24px;
      line-height: 32px;
      color: var(--background);
    }
  }

  main {
    display: flex;
    flex: 8;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
  }

  .main-content {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    text-align: center;
    width: 100%;
    max-width: 320px;

    > img {
      width: 155px;
      height: auto;
      align-self: center;
    }

    form {
      input {
        height: 50px;
        padding: 0 16px;
        background: var(--background);
        color: var(--black);
        border: 1px solid var(--gray-medium);
        border-radius: 8px;
      }

      input:focus-visible {
        border: 1px solid var(--gray-dark);
        outline: none;
      }

      button {
        margin-top: 16px;
      }

      button,
      input {
        width: 100%;
      }
    }
  }

  .create-room {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-top: 64px;
    font-weight: 500;
    background: #ea4335;
    color: #fff;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    transition: filter 0.2s;

    img {
      width: 30px;
      height: auto;
      margin-right: 8px;
      border-radius: 100px;
      padding: 4px;
      background: rgba(0, 0, 0, 0.25);
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  .separator {
    display: flex;
    align-items: center;
    margin: 32px 0;
    font-size: 14px;
    color: var(--gray-medium);

    &::before {
      content: "";
      flex: 1;
      height: 1px;
      margin-right: 16px;
      background: var(--gray-medium);
    }

    &::after {
      content: "";
      flex: 1;
      height: 1px;
      margin-left: 16px;
      background: var(--gray-medium);
    }
  }
`
