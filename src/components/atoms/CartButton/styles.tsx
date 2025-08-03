import styled from 'styled-components';

export const CartButtonContainer = styled.div`
  .box-carrinho-mobile {
    .btn-open {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${props => props.theme.colors.gray[100]};
      position: relative;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: ${props => props.theme.colors.gray[200]};
      }
      
      .badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 18px;
        text-align: center;
      }
    }
  }
`;