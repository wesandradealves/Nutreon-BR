import { AlertContainer } from './styles';

interface AlertProps {
  severity?: 'success' | 'info' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

export function Alert({ severity = 'info', children, className }: AlertProps) {
  const getSeverityClasses = () => {
    switch (severity) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <AlertContainer 
      className={`p-4 rounded-md border ${getSeverityClasses()} ${className || ''}`}
    >
      {children}
    </AlertContainer>
  );
}