import styled from 'styled-components';

export const SearchButtonContainer = styled.div.attrs({
  className: 'busca mod-full'
})`
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #16a34a;
      color: #16a34a;
    }
    
    .icon {
      width: 16px;
      height: 16px;
    }
  }
`;