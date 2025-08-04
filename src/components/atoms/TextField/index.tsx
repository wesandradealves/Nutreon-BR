import { forwardRef } from 'react';
import { InputContainer, Label, Input, ErrorMessage } from './styles';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, fullWidth, className, ...props }, ref) => {
    return (
      <InputContainer className={`${fullWidth ? 'w-full' : ''} ${className || ''}`}>
        {label && (
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
            }
          `}
          {...props}
        />
        {helperText && (
          <ErrorMessage className={`text-sm mt-1 ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {helperText}
          </ErrorMessage>
        )}
      </InputContainer>
    );
  }
);

TextField.displayName = 'TextField';