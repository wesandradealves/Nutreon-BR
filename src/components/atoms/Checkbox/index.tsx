'use client';

import { forwardRef, useCallback } from 'react';
import { CheckboxContainer, CheckboxInput, CheckboxLabel } from './styles';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, onChange, ...props }, ref) => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    }, [onChange]);

    return (
      <CheckboxContainer className={`flex items-center ${className || ''}`}>
        <CheckboxInput
          ref={ref}
          type="checkbox"
          onChange={handleChange}
          className={`
            w-4 h-4 text-primary-500 rounded focus:ring-2 
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-primary-500'
            }
          `}
          {...props}
        />
        {label && (
          <CheckboxLabel 
            className="ml-2 text-sm text-gray-700 select-none cursor-pointer"
            htmlFor={props.id}
          >
            {label}
          </CheckboxLabel>
        )}
      </CheckboxContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';