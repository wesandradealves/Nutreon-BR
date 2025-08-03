import styled from 'styled-components';

export const DeliveryCheckContainer = styled.a`
  display: flex !important;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #16a34a;
    color: #16a34a;
  }
  
  .delivery-check__content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .delivery-check__icon {
    font-size: 20px;
  }
  
  .delivery-check__title,
  .delivery-check__label,
  .delivery-check__location {
    margin: 0;
    font-weight: normal;
  }
  
  .delivery-check__title {
    font-size: 14px;
  }
  
  .delivery-check__label,
  .delivery-check__location {
    font-size: 12px;
  }
`;