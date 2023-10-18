import styled from "styled-components"

export const StyledRoom = styled.div`
  header {
    padding: 22px;
    border-bottom: 1px solid var(--divider);

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1120px;
      margin: 0 auto;

      img {
        width: 101px;
        height: auto;
      }

      > div {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }
  }

  main {
    margin: 0 auto;
    max-width: 800px;

    .room-title {
      display: flex;
      align-items: center;
      margin: 32px 0 24px;

      h1 {
        font-family: "Poppins", sans-serif;
        font-size: 24px;
        color: var(--black);
      }

      span {
        margin-left: 16px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        background: var(--pink-dark);
        color: var(--background);
        border-radius: 9999px;
      }
    }

    form {
      textarea {
        width: 100%;
        min-height: 130px;
        padding: 16px;
        background: var(--details);
        color: var(--black);
        box-shadow: 0 2px 12px hsla(0, 0%, 0%, 0.14);
        border: 0 #000000 solid;
        border-radius: 8px;
        resize: none;
      }

      .form-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;

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
            font-weight: 500;
            color: var(--black);
          }
        }

        > span {
          font-size: 14px;
          font-weight: 500;
          color: var(--gray-dark);

          a {
            font-size: 14px;
            font-weight: 500;
            background: transparent;
            color: var(--purple);
            border: 0;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }

    .question-list {
      margin-top: 32px;
    }
  }
`
