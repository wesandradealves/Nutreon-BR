'use client';

import IconButton from '../IconButton';
import { SearchButtonContainer, SearchIcon, SearchText } from './styles';

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
        icon={<SearchIcon className="fas fa-search text-gray-400" />}
        ariaLabel="Buscar"
        className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-sm transition-all duration-300 hover:bg-dark-700 hover:border-primary-500 hover:text-white focus:outline-none focus:border-primary-500"
      >
        <SearchText className="text-gray-400">{text}</SearchText>
      </IconButton>
    </SearchButtonContainer>
  );
};

export default SearchButton;