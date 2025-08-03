import styled from 'styled-components';

export const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: all 0.3s ease;
  
  &.scrolled {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
`;