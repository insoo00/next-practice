'use client';

import { Recipe } from '@/app/api/recipes/type/recipe';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ recipeId }: { recipeId: string }) {
  const router = useRouter();

  const handleDeleteClick = async () => {
    const localStorageRecipes = JSON.parse(
      localStorage.getItem('recipes') || '[]'
    );
    const updatedLocalStorageRecipes = localStorageRecipes.filter(
      (r: Recipe) => r.id !== recipeId
    );
    localStorage.setItem('recipes', JSON.stringify(updatedLocalStorageRecipes));

    await fetch(`/api/recipes/${recipeId}`, {
      method: 'DELETE',
    });

    router.push('/recipes');
  };

  return (
    <button
      className='bg-red-500 text-black px-4 py-2 rounded mr-2'
      onClick={handleDeleteClick}
    >
      삭제
    </button>
  );
}
