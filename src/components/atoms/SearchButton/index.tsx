'use client';

import IconButton from '../IconButton';
import { SearchButtonContainer, SearchIcon } from './styles';

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
    <SearchButtonContainer className={`busca mod-full ${className}`}>
      <IconButton
        onClick={onClick}
        icon={<SearchIcon className="fa fa-search w-4 h-4" />}
        ariaLabel="Buscar"
        className="flex items-center gap-2 px-4 py-1.5 border border-dark-700 rounded text-gray-300 text-sm transition-all duration-300 hover:border-primary-500 hover:text-primary-500"
      >
        {text}
      </IconButton>
    </SearchButtonContainer>
  );
};

export default SearchButton;