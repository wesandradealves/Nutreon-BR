import styled from 'styled-components';

export const LogoContainer = styled.div`
  a {
    display: block;
  }
  
  img {
    max-height: 60px;
    width: auto;
  }
  
  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    color: ${props => props.theme?.colors?.primary || '#00e8d4'};
  }
`;