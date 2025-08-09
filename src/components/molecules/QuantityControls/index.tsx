'use client';

import { useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';
import {
  ControlsWrapper,
  QuantityButton,
  QuantityValue
} from './styles';

interface QuantityControlsProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export function QuantityControls({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
  className = ''
}: QuantityControlsProps) {
  const handleDecrease = useCallback(() => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  }, [quantity, min, disabled, onQuantityChange]);

  const handleIncrease = useCallback(() => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  }, [quantity, max, disabled, onQuantityChange]);

  return (
    <ControlsWrapper className={`flex items-center gap-3 ${className}`}>
      <QuantityButton
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Diminuir quantidade"
      >
        <Minus size={16} />
      </QuantityButton>
      
      <QuantityValue className="w-12 text-center font-medium">
        {quantity}
      </QuantityValue>
      
      <QuantityButton
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Aumentar quantidade"
      >
        <Plus size={16} />
      </QuantityButton>
    </ControlsWrapper>
  );
}