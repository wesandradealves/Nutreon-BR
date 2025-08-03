'use client';

import { Search } from '@mui/icons-material';
import { SearchButtonContainer } from './styles';

interface SearchButtonProps {
  onClick: () => void;
  text?: string;
  className?: string;
}

const SearchButton = ({ 
  onClick, 
  text = 'O que procura?',
  className = ''
}: SearchButtonProps) => {
  return (
    <SearchButtonContainer className={className}>
      <a 
        href="#" 
        className="btn-abrir js-abrir-busca"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {text}
        <Search className="icon" />
      </a>
    </SearchButtonContainer>
  );
};

export default SearchButton;