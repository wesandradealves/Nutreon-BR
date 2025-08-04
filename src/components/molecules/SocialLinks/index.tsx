'use client';

import { SocialLinksContainer, SocialLink, SocialIcon } from './styles';

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
        <span className="sr-only">Facebook</span>
      </SocialLink>
      <SocialLink 
        href={youtube} 
        target="_blank" 
        rel="noopener"
        className="inline-flex items-center justify-center w-6 h-6 text-gray-300 hover:text-primary-500 transition-colors"
      >
        <SocialIcon className="fa-brands fa-youtube text-base" />
        <span className="sr-only">YouTube</span>
      </SocialLink>
      <SocialLink 
        href={instagram} 
        target="_blank" 
        rel="noopener"
        className="inline-flex items-center justify-center w-6 h-6 text-gray-300 hover:text-primary-500 transition-colors"
      >
        <SocialIcon className="fa-brands fa-instagram text-base" />
        <span className="sr-only">Instagram</span>
      </SocialLink>
      <SocialLink 
        href={whatsapp} 
        target="_blank" 
        rel="noopener" 
        className="inline-flex items-center justify-center w-6 h-6 text-gray-300 hover:text-primary-500 transition-colors hidden lg:inline-flex"
      >
        <SocialIcon className="fa-brands fa-whatsapp text-base" />
        <span className="sr-only">WhatsApp</span>
      </SocialLink>
    </SocialLinksContainer>
  );
};

export default SocialLinks;