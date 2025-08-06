import styled from 'styled-components';

export const Container = styled.div``;

export const BackgroundImage = styled.div<{ $backgroundImage: string }>`
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(100%);
`;

export const BackgroundOverlay = styled.div``;

export const ContentWrapper = styled.div``;