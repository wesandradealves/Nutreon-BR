import { useState } from 'react';
import { TabsContainer, TabsList, Tab, TabPanel } from './styles';

interface TabItem {
  label: string;
  value: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  value?: string | number;
  onChange?: (event: React.SyntheticEvent, value: string | number) => void;
  children: React.ReactNode;
}

export function Tabs({ tabs, value, onChange, children }: TabsProps) {
  const [internalValue, setInternalValue] = useState(value || tabs[0]?.value);
  const activeValue = value !== undefined ? value : internalValue;

  const handleTabClick = (event: React.MouseEvent, tabValue: string | number) => {
    if (onChange) {
      onChange(event as React.SyntheticEvent, tabValue);
    } else {
      setInternalValue(tabValue);
    }
  };

  return (
    <TabsContainer>
      <TabsList className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            className={`
              px-4 py-2 font-medium text-sm transition-colors duration-200
              ${activeValue === tab.value 
                ? 'text-cyan-600 border-b-2 border-cyan-600' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
            onClick={(e) => handleTabClick(e, tab.value)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabsList>
      {children}
    </TabsContainer>
  );
}

interface TabPanelProps {
  value: string | number;
  index: string | number;
  children: React.ReactNode;
}

export function TabPanelComponent({ value, index, children }: TabPanelProps) {
  return (
    <TabPanel className={value === index ? 'block' : 'hidden'}>
      {children}
    </TabPanel>
  );
}