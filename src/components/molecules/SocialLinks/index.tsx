'use client';

import { SocialLinksContainer, SocialLink, SocialIcon, ScreenReaderText } from './styles';

interface SocialLinksProps {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
  className?: string;
}

const SocialLinks = ({
  facebook = '#',
  instagram = '#',
  youtube = '#',
  whatsapp = '#',
  className = ''
}: SocialLinksProps) => {
  return (
    <SocialLinksContainer className={`flex items-center gap-2 ${className}`}>
      <SocialLink 
        href={facebook} 
        target="_blank" 
        rel="noopener"
        className="inline-flex items-center justify-center w-6 h-6 text-gray-300 hover:text-primary-500 transition-colors"
      >
        <SocialIcon className="fa-brands fa-facebook-f text-base" />
        <ScreenReaderText className="sr-only">Facebook</ScreenReaderText>
      </SocialLink>
      <SocialLink 
        href={youtube} 
        target="_blank" 
        rel="noopener"
        className="inline-flex items-center justify-center w-6 h-6 text-gray-300 hover:text-primary-500 transition-colors"
      >
        <SocialIcon className="fa-brands fa-youtube text-base" />
        <ScreenReaderText className="sr-only">YouTube</ScreenReaderText>
      </SocialLink>
      <SocialLink 
        href={instagram} 
        target="_blank" 
        rel="noopener"
        className="inline-flex items-center justify-center w-6 h-6 text-gray-300 hover:text-primary-500 transition-colors"
      >
        <SocialIcon className="fa-brands fa-instagram text-base" />
        <ScreenReaderText className="sr-only">Instagram</ScreenReaderText>
      </SocialLink>
      <SocialLink 
        href={whatsapp} 
        target="_blank" 
        rel="noopener" 
        className="inline-flex items-center justify-center w-6 h-6 text-gray-300 hover:text-primary-500 transition-colors hidden lg:inline-flex"
      >
        <SocialIcon className="fa-brands fa-whatsapp text-base" />
        <ScreenReaderText className="sr-only">WhatsApp</ScreenReaderText>
      </SocialLink>
    </SocialLinksContainer>
  );
};

export default SocialLinks;