import React from 'react';
import { useLoader } from '@/context/spinner';
import { SpinnerOverlay, SpinnerIcon } from './styles';

const Spinner: React.FC = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <SpinnerOverlay className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <SpinnerIcon className="w-[50px] h-[50px] rounded-full" />
    </SpinnerOverlay>
  );
};

export default Spinner;