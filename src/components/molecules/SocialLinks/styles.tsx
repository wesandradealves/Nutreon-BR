import styled from 'styled-components';

export const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #666;
    transition: color 0.3s ease;
    
    &:hover {
      color: #16a34a;
    }
    
    &.desktop {
      @media (max-width: 767px) {
        display: none;
      }
    }
    
    svg {
      font-size: 16px;
    }
  }
`;