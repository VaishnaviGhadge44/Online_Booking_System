import styled, { css } from 'styled-components';

const subColor = '#3FA9F577';
const mainColor = '#3FA9F5';
const textColor = '#7a7994';

const shrinkLabelStyles = css`
  top: -8px;
  font-size: 12px;
  color: ${mainColor};
  padding: 0 0.4em;
  /* border-radius: 0.2rem; */
  /* border: 1px solid ${mainColor}; */
  background-color: #fff;
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 10px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: #0000;
  color: ${textColor};
  color: #7a7994;
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 3px;
  border: 1px solid ${subColor};
  margin: 20px 0;
  padding-left: 0.6em;

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles};
  }
`;

export const FormInputLabel = styled.label`
  color: ${textColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 0.5rem;
  transition: 200ms ease all;
  padding-left: 0.6em;

  &.shrink {
    ${shrinkLabelStyles};
  }
`;
