'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className='bg-gray-800 p-4 flex justify-between items-center'>
      <Link className='text-white text-2xl' href='/'>
        나만의 레시피
      </Link>
      <nav className='flex space-x-4'>
        <Link href='/recipes/add'>레시피 추가</Link>
        {session ? (
          <Link href='/api/auth/signout'>로그아웃</Link>
        ) : (
          <Link href='/api/auth/signin'>로그인</Link>
        )}
      </nav>
    </header>
  );
}
