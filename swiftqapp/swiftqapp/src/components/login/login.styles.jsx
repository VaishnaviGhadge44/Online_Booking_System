import styled from 'styled-components';

export const LoginContainer = styled.div`
  color: #134;

  display: flex;

  flex-direction: column;
  text-align: center;

  max-width: 25em;
  flex: 1;
  img {
    align-self: center;
    /* margin-bottom: -1em; */
  }
`;

export const FormContainer = styled.form`
  width: auto;
`;

export const SubmitContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  margin-top: 30px;
  gap: 15px;

  .ant-btn-primary:hover,
  .ant-btn-primary:active {
    background-color: #0095ff !important;
  }

  .ant-btn-primary {
    padding: 1.5em 0;
    border-radius: 4px;
    border: none;
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: center;
    background-color: #3fa9f5;
  }
  span {
    /* color: #0a7afa; */

    text-align: center;
  }
`;
