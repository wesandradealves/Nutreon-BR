import { Button } from './styles';

interface BuyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export function BuyButton({ onClick, disabled, loading, children }: BuyButtonProps) {
  return (
    <Button 
      className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 hover:bg-cyan-600 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed uppercase tracking-wider"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Adicionando...' : children}
    </Button>
  );
}