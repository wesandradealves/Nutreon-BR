import styled from 'styled-components';

export const NavigationContainer = styled.nav`
  .navigation__list {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .navigation__item {
    position: relative;
    
    &--dropdown {
      &:hover {
        .navigation__submenu {
          display: block;
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
  
  .navigation__link {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    color: #374151;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #16a34a;
    }
    
    &--dropdown {
      cursor: pointer;
    }
  }
  
  .navigation__icon {
    font-size: 18px;
  }
  
  .navigation__submenu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 220px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    list-style: none;
    margin: 0;
  }
  
  .navigation__submenu-item {
    margin: 0;
  }
  
  .navigation__submenu-link {
    display: block;
    padding: 8px 16px;
    color: #4b5563;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #f3f4f6;
      color: #16a34a;
    }
  }
`;