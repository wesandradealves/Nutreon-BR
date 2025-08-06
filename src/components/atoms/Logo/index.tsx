'use client';

import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LogoContainer, LogoText } from './styles';

interface LogoProps {
  href?: string;
  imageUrl?: string;
  altText?: string;
  className?: string;
}

const Logo = ({ 
  href = '/', 
  imageUrl = '/logo-nutreon.png',
  altText = 'Nutreon - Nutrindo Saúde, Transformando Vidas',
  className = ''
}: LogoProps) => {
  return (
    <LogoContainer className={className}>
      <Link href={href} aria-label={altText}>
        {imageUrl ? (
          <LazyLoadImage
            src={imageUrl}
            alt={altText}
            effect="blur"
            className="max-h-[60px] w-auto"
          />
        ) : (
          <LogoText className="m-0 text-[32px] font-bold text-primary-500">Nutreon</LogoText>
        )}
      </Link>
    </LogoContainer>
  );
};

export default Logo;