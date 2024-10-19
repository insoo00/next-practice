'use client';

import { useRouter } from 'next/navigation';

export default function BackToListButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/recipes');
  };

  return (
    <button
      onClick={handleClick}
      className='bg-gray-100 text-black px-4 py-2 rounded'
    >
      목록으로
    </button>
  );
}
