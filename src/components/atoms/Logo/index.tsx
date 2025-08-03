'use client';

import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LogoContainer } from './styles';

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
            className="img-responsive"
          />
        ) : (
          <h1>Nutreon</h1>
        )}
      </Link>
    </LogoContainer>
  );
};

export default Logo;