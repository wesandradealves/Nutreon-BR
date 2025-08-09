'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  BreadcrumbContainer,
  BreadcrumbWrapper,
  BreadcrumbList,
  BreadcrumbItemWrapper,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbCurrent
} from './styles';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const breadcrumbItems = useMemo(() => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;
      
      return (
        <BreadcrumbItemWrapper key={index} className="inline-flex items-center">
          <BreadcrumbItem className="inline-flex items-center">
            {isLast ? (
              <BreadcrumbCurrent className="text-gray-500 text-sm">
                {item.label}
              </BreadcrumbCurrent>
            ) : item.href ? (
              <Link href={item.href}>
                <BreadcrumbLink className="text-sm text-gray-600 hover:text-primary-500 transition-colors cursor-pointer">
                  {item.label}
                </BreadcrumbLink>
              </Link>
            ) : (
              <BreadcrumbCurrent className="text-gray-500 text-sm">
                {item.label}
              </BreadcrumbCurrent>
            )}
          </BreadcrumbItem>
          
          {!isLast && (
            <BreadcrumbSeparator className="mx-2 text-gray-400">
              <ChevronRight size={16} />
            </BreadcrumbSeparator>
          )}
        </BreadcrumbItemWrapper>
      );
    });
  }, [items]);

  return (
    <BreadcrumbContainer 
      aria-label="Navegação estrutural"
      className={`bg-gray-50 border-b border-gray-200 ${className || ''}`}
    >
      <BreadcrumbWrapper className="container mx-auto px-4 py-3">
        <BreadcrumbList className="flex items-center flex-wrap">
          {breadcrumbItems}
        </BreadcrumbList>
      </BreadcrumbWrapper>
    </BreadcrumbContainer>
  );
}