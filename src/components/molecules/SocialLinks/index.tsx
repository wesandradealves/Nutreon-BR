'use client';

import { Facebook, Instagram, YouTube, WhatsApp } from '@mui/icons-material';
import { SocialLinksContainer } from './styles';

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
    <SocialLinksContainer className={className}>
      <a href={facebook} target="_blank" rel="noopener">
        <Facebook />
        <span className="sr-only">Facebook</span>
      </a>
      <a href={youtube} target="_blank" rel="noopener">
        <YouTube />
        <span className="sr-only">YouTube</span>
      </a>
      <a href={instagram} target="_blank" rel="noopener">
        <Instagram />
        <span className="sr-only">Instagram</span>
      </a>
      <a href={whatsapp} target="_blank" rel="noopener" className="desktop">
        <WhatsApp />
        <span className="sr-only">WhatsApp</span>
      </a>
    </SocialLinksContainer>
  );
};

export default SocialLinks;