import styled from 'styled-components';

export const UserActionsContainer = styled.div`
  .user-actions__list {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .user-actions__item {
    position: relative;
  }
  
  .user-actions__link {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    
    &:hover {
      color: #16a34a;
    }
  }
  
  .user-actions__icon {
    font-size: 18px;
  }
  
  @media (max-width: 767px) {
    display: none;
  }
`;