import { DividerContainer, DividerLine, DividerText } from './styles';

interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className }: DividerProps) {
  if (text) {
    return (
      <DividerContainer className={`relative flex items-center my-6 ${className || ''}`}>
        <DividerLine className="flex-1 h-px bg-gray-300" />
        <DividerText className="px-4 text-sm text-gray-500 bg-white">
          {text}
        </DividerText>
        <DividerLine className="flex-1 h-px bg-gray-300" />
      </DividerContainer>
    );
  }

  return (
    <DividerLine 
      className={`h-px bg-gray-300 my-6 ${className || ''}`} 
    />
  );
}