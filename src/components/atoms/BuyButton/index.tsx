import { Button } from '../Button';

interface BuyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export function BuyButton({ onClick, disabled, loading, children }: BuyButtonProps) {
  return (
    <Button 
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      className="font-bold py-3 uppercase tracking-wider hover:shadow-lg"
    >
      {loading ? 'Adicionando...' : children}
    </Button>
  );
}