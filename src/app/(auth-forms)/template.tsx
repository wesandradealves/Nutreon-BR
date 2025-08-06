'use client';

import { IMAGES } from '@/utils/constants';
import {
  Container,
  BackgroundImage,
  BackgroundOverlay,
  ContentWrapper
} from './styles';

interface AuthFormsTemplateProps {
  children: React.ReactNode;
}

export default function AuthFormsTemplate({ children }: AuthFormsTemplateProps) {
  return (
    <Container className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Grayscale */}
      <BackgroundImage 
        className="absolute inset-0 w-full h-full"
        $backgroundImage={IMAGES.AUTH_BACKGROUND}
      />
      
      {/* Primary Color Overlay */}
      <BackgroundOverlay className="absolute inset-0 bg-primary-500 opacity-90 mix-blend-multiply" />
      
      {/* Content */}
      <ContentWrapper className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 sm:p-6 lg:p-8 items-center">
        {children}
      </ContentWrapper>
    </Container>
  );
}