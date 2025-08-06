'use client';
import { Main } from './styles';

export default function Template({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Main className='flex-1'>
        {children}
      </Main>
    </>
  );
}
