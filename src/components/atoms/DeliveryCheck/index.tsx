'use client';

import { useCallback } from 'react';
import { 
  DeliveryCheckContainer,
  DeliveryContent,
  DeliveryIcon,
  DeliveryMessage,
  DeliveryAddress,
  DeliveryTitle,
  DeliveryLabel,
  DeliveryLocation
} from './styles';

interface DeliveryCheckProps {
  isDelivering?: boolean;
  address?: string;
  onClick: () => void;
  className?: string;
}

const DeliveryCheck = ({ 
  isDelivering = false,
  address = '',
  onClick,
  className = ''
}: DeliveryCheckProps) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();
  }, [onClick]);

  return (
    <DeliveryCheckContainer 
      href="#" 
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-1.5 border border-dark-700 rounded text-gray-300 hover:border-primary-500 hover:text-primary-500 transition-all ${className}`}
    >
      <DeliveryContent className="flex items-center gap-2">
        <DeliveryIcon className="fa fa-map-marker text-lg" />
        <DeliveryMessage 
          className={`${isDelivering ? 'hidden' : 'block'}`}
        >
          <DeliveryTitle className="text-sm font-normal m-0">Será que entrega?</DeliveryTitle>
        </DeliveryMessage>
        <DeliveryAddress 
          className={`${isDelivering ? 'block' : 'hidden'}`}
        >
          <DeliveryLabel className="text-xs font-normal m-0">Entregar em</DeliveryLabel>
          <DeliveryLocation className="text-xs font-normal m-0">{address}</DeliveryLocation>
        </DeliveryAddress>
      </DeliveryContent>
    </DeliveryCheckContainer>
  );
};

export default DeliveryCheck;