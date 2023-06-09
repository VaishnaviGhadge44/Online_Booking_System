import styled, { css } from 'styled-components';

const closedSidebarStyles = css`
  width: 4.6em;

  .menu-item_text {
    opacity: 0;
    transition: 300ms;
  }

  h1 {
    opacity: 0;
    transition: 300ms;
  }
`;

const openSidebarStyles = css`
  width: 300px;

  .menu-item_text {
    transition: 150ms;
  }

  h1 {
    display: flex;
    transition: 300ms;
  }
`;

const getSidebarStyles = ({ isClosed }) => (isClosed ? closedSidebarStyles : openSidebarStyles);

export const SidebarStyled = styled.div`
  transition: 500ms;

  ${getSidebarStyles}
`;
