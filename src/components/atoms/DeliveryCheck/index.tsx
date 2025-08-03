'use client';

import { LocationOn } from '@mui/icons-material';
import { DeliveryCheckContainer } from './styles';

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
  return (
    <DeliveryCheckContainer 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`delivery-check ${className}`}
    >
      <div className="delivery-check__content">
        <LocationOn className="delivery-check__icon" />
        <div 
          className="delivery-check__message" 
          style={{ display: isDelivering ? 'none' : 'block' }}
        >
          <h5 className="delivery-check__title">Será que entrega?</h5>
        </div>
        <div 
          className="delivery-check__address" 
          style={{ display: isDelivering ? 'block' : 'none' }}
        >
          <h6 className="delivery-check__label">Entregar em</h6>
          <h6 className="delivery-check__location">{address}</h6>
        </div>
      </div>
    </DeliveryCheckContainer>
  );
};

export default DeliveryCheck;