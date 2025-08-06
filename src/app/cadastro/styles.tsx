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

export const RegisterCard = styled.div``;

export const RegisterForm = styled.form``;

export const FormHeader = styled.div``;

export const FormTitle = styled.h1``;

export const FormSubtitle = styled.p``;

export const FormContent = styled.div``;

export const FormRow = styled.div``;

export const FormActions = styled.div``;

export const SocialRegister = styled.div``;

export const LoginPrompt = styled.div``;

export const LoginPromptText = styled.span``;

export const BenefitsSection = styled.div``;

export const BenefitsWrapper = styled.div``;

export const BenefitsTitle = styled.h2``;

export const BenefitsText = styled.p``;

export const BenefitsList = styled.ul``;

export const BenefitItem = styled.li``;

export const BenefitIcon = styled.i``;

export const BenefitText = styled.span``;