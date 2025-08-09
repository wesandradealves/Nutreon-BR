import { useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { QuantityContainer, QuantityButton, QuantityInput } from './styles';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ 
  value, 
  onChange, 
  min = 1, 
  max = 99 
}: QuantitySelectorProps) {
  const handleDecrease = useCallback(() => {
    if (value > min) {
      onChange(value - 1);
    }
  }, [value, min, onChange]);

  const handleIncrease = useCallback(() => {
    if (value < max) {
      onChange(value + 1);
    }
  }, [value, max, onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  }, [min, max, onChange]);

  return (
    <QuantityContainer className="flex items-center">
      <QuantityButton 
        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors disabled:bg-gray-300 rounded-l"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <Minus size={16} />
      </QuantityButton>
      
      <QuantityInput
        className="w-12 h-8 text-center border-y border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        aria-label="Quantidade"
      />
      
      <QuantityButton 
        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors disabled:bg-gray-300 rounded-r"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <Plus size={16} />
      </QuantityButton>
    </QuantityContainer>
  );
}