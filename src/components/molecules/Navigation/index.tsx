'use client';

import Link from 'next/link';
import { ExpandMore } from '@mui/icons-material';
import { NavigationContainer } from './styles';
import classNames from 'classnames';

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
    <NavigationContainer className={classNames('navigation', className)}>
      <ul className="navigation__list">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={classNames('navigation__item', {
              'navigation__item--dropdown': item.children && item.children.length > 0
            })}
          >
            {item.children ? (
              <>
                <a 
                  href="#" 
                  className="navigation__link navigation__link--dropdown"
                  aria-label={item.label}
                >
                  {item.label} <ExpandMore className="navigation__icon" />
                </a>
                <ul className="navigation__submenu">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="navigation__submenu-item">
                      <Link href={child.href} className="navigation__submenu-link">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={item.href} className="navigation__link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </NavigationContainer>
  );
};

export default Navigation;