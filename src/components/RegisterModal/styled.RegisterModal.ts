import styled from "@emotion/styled";

const SendAmountInput = styled.div`
  .SendAmountInput-number {
    .MuiInput-root {
      font-size: 32px;
      font-weight: bold;
      input {
        text-align: center;
      }
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .MuiInput-root:before,
    .MuiInput-root:after {
      display: none;
    }
  }
`;

const ReceiveAccount = styled.div`
  border-radius: 0.5rem;
  border: 2px solid #076ae0;
  padding: 12px;
`;

export const S = {
  ReceiveAccount,
  SendAmountInput,
};
