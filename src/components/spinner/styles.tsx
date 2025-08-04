import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerOverlay = styled.div``;

export const SpinnerIcon = styled.div`
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-top-color: ${props => props.theme.colors.primary};
  border-top-width: 5px;
  animation: ${spin} 1s linear infinite;
`;