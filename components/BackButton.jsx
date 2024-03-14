"use client";

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;
