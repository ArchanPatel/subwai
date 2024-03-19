"use client";

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button type='button' onClick={handleClick} className='black_btn'>
      Back
    </button>
  );
};

export default BackButton;
