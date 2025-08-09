'use client';

import { TopBarContainer, TopBarContent, SocialSection, ActionsSection } from './styles';
import SocialLinks from '@/components/molecules/SocialLinks';
import SearchButton from '@/components/atoms/SearchButton';
import UserActions from '@/components/molecules/UserActions';
import { ContactText } from '@/components/atoms/Typography';

interface TopBarProps {
  isAuthenticated: boolean;
  customerName?: string;
  onSearchClick: () => void;
}

const TopBar = ({
  isAuthenticated,
  customerName,
  onSearchClick
}: TopBarProps) => {
  return (
    <TopBarContainer className="hidden lg:block border-b border-dark-800">
      <TopBarContent className="container mx-auto px-4">
        <div className="flex items-center justify-between w-full py-2">
          <SocialSection className="flex items-center gap-4">
            <SocialLinks 
              facebook="https://www.facebook.com/nutreon"
              youtube="https://www.youtube.com/nutreon"
              instagram="https://www.instagram.com/nutreon"
              whatsapp="https://api.whatsapp.com/send?phone=5511999999999&text=Olá!"
              className="text-white"
            />
            <ContactText className="text-sm text-gray-300">11 99999-9999</ContactText>
          </SocialSection>
          
          <ActionsSection className="flex items-center gap-4">
            <SearchButton onClick={onSearchClick} />
            <UserActions
              isAuthenticated={isAuthenticated}
              userName={customerName}
            />
          </ActionsSection>
        </div>
      </TopBarContent>
    </TopBarContainer>
  );
};

export default TopBar;