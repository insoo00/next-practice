'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { type Recipe } from '../api/recipes/type/recipe';
import RecipeItem from '../components/recipe/RecipeItem';

export default function Recipes() {
  const { data: session } = useSession();
  const user = session?.user?.email || '';
  const encodedUser = encodeURIComponent(user);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    (async function () {
      const data = (await fetch(
        `http://localhost:3000/api/recipes?user=${encodedUser}`
      ).then((res) => res.json())) as Recipe[];
      setRecipes(data);
    })();
  }, [encodedUser]);

  return (
    <main className='flex-grow bg-gray-500 p-4'>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}
