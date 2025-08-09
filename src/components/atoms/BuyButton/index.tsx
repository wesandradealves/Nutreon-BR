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
      className="py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-600 shadow-[0_4px_0_0_#00a8a0] hover:shadow-[0_2px_0_0_#00a8a0] active:shadow-none active:translate-y-[2px] transition-all uppercase"
    >
      {loading ? 'Adicionando...' : children}
    </Button>
  );
}