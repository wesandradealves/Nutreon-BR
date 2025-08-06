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

export const VerifyCard = styled.div``;

export const CardContent = styled.div``;

export const IconWrapper = styled.div``;

export const LoadingSpinner = styled.div``;

export const SuccessIcon = styled.i``;

export const ErrorIcon = styled.i``;

export const Title = styled.h1``;

export const Message = styled.p``;

export const ButtonGroup = styled.div``;

export const InfoSection = styled.div``;

export const InfoWrapper = styled.div``;

export const InfoTitle = styled.h2``;

export const InfoText = styled.p``;

export const StepsList = styled.ul``;

export const StepItem = styled.li``;

export const StepIcon = styled.i``;

export const StepText = styled.span``;

export const StepStrong = styled.strong``;