import { auth } from '@/lib/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <main className='flex-grow flex flex-col items-center justify-center  bg-gray-500 p-4'>
      {session ? (
        <>
          <h1 className='text-white text-2xl font-bold mb-4'>
            안녕하세요, {session?.user?.email}님!
          </h1>
          <Link href='/recipes'>나만의 레시피 보러 가기</Link>
        </>
      ) : (
        <>
          <h1 className='text-white text-2xl font-bold mb-4'>
            안녕하세요, 로그인 먼저 해주세요.
          </h1>
          <Link href='/api/auth/signin'>로그인</Link>
        </>
      )}
    </main>
  );
}
