import styled from 'styled-components';

export const LoadingContainer = styled.div``;

export const SpinnerWrapper = styled.div`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .spinner {
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top-color: ${props => props.theme.colors.primary};
    animation: spin 1s linear infinite;
  }
`;