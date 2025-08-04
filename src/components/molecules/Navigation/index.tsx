'use client';

import Link from 'next/link';
import { 
  NavigationContainer, 
  NavList, 
  NavItem, 
  NavLink, 
  NavIcon,
  SubMenu,
  SubMenuItem,
  SubMenuLink
} from './styles';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface NavigationProps {
  items: NavItem[];
  className?: string;
}

const Navigation = ({ items, className = '' }: NavigationProps) => {
  return (
    <NavigationContainer className={className}>
      <NavList className="flex items-center gap-2 m-0 p-0 list-none">
        {items.map((item, index) => (
          <NavItem 
            key={index} 
            className={`relative ${item.children ? 'group' : ''}`}
          >
            {item.children ? (
              <>
                <NavLink 
                  href="#" 
                  className="flex items-center gap-1 px-4 py-2 text-gray-300 no-underline text-sm font-medium transition-colors hover:text-primary-500 cursor-pointer"
                  aria-label={item.label}
                >
                  {item.label} <NavIcon className="fa fa-chevron-down text-xs" />
                </NavLink>
                <SubMenu className="absolute top-full left-0 min-w-[220px] bg-dark-800 border border-dark-700 rounded shadow-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 list-none m-0">
                  {item.children.map((child, childIndex) => (
                    <SubMenuItem key={childIndex} className="m-0">
                      <SubMenuLink 
                        href={child.href} 
                        className="block px-4 py-2 text-gray-300 no-underline text-sm transition-all hover:bg-dark-700 hover:text-primary-500"
                      >
                        {child.label}
                      </SubMenuLink>
                    </SubMenuItem>
                  ))}
                </SubMenu>
              </>
            ) : (
              <Link 
                href={item.href} 
                className="flex items-center gap-1 px-4 py-2 text-gray-300 no-underline text-sm font-medium transition-colors hover:text-primary-500"
              >
                {item.label}
              </Link>
            )}
          </NavItem>
        ))}
      </NavList>
    </NavigationContainer>
  );
};

export default Navigation;