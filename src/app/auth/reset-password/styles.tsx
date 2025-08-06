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

export const ResetCard = styled.div``;

export const CardContent = styled.div``;

export const CardInner = styled.div``;

export const Title = styled.h1``;

export const Form = styled.form``;

export const PasswordStrengthWrapper = styled.div``;

export const PasswordStrengthText = styled.span``;

export const PasswordStrengthBarContainer = styled.div``;

export const PasswordStrengthBar = styled.div``;

export const InfoSection = styled.div``;

export const InfoWrapper = styled.div``;

export const InfoTitle = styled.h2``;

export const InfoText = styled.p``;

export const SecurityList = styled.ul``;

export const SecurityItem = styled.li``;

export const SecurityIcon = styled.i``;

export const SecurityText = styled.span``;

// Para o estado de sucesso
export const SuccessCard = styled.div``;

export const SuccessMessage = styled.p``;