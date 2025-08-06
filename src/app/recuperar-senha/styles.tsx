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

export const RecoveryCard = styled.div``;

export const RecoveryForm = styled.form``;

export const FormHeader = styled.div``;

export const BackButton = styled.button``;

export const BackIcon = styled.i``;

export const FormTitle = styled.h1``;

export const FormSubtitle = styled.p``;

export const FormContent = styled.div``;

export const FormActions = styled.div``;

export const SuccessMessage = styled.div``;

export const SuccessIcon = styled.i``;

export const SuccessTitle = styled.h2``;

export const SuccessText = styled.p``;

export const InfoSection = styled.div``;

export const InfoWrapper = styled.div``;

export const InfoTitle = styled.h2``;

export const InfoText = styled.p``;

export const StepsList = styled.ol``;

export const StepItem = styled.li``;

export const StepNumber = styled.span``;

export const StepText = styled.span``;

export const SecurityNote = styled.div``;

export const SecurityIcon = styled.i``;

export const SecurityText = styled.p``;

// Additional styled components
export const FieldWrapper = styled.div``;
export const EmailHighlight = styled.strong``;
export const SecurityContent = styled.div``;
export const SecurityTitle = styled.h3``;