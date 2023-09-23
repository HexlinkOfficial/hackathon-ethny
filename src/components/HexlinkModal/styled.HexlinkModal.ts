import styled, { css } from 'styled-components'

const ModalMain = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 350px;
    max-width: 90vw;
    background: #fff;
    border-radius: 12px;
    padding: 20px 24px;
    .Modal-header {
      text-align: right;
      height: 24px;
      .Modal-close-icon {
        color: #9e9e9e;
        cursor: pointer;
        font-size: 24px;
        &:hover {
          color: #212121;
        }
      }
    }
  `
)

export const S = {
  ModalMain,
};
