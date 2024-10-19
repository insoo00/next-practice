'use client';
import RecipeTitle from '@/app/components/recipe/RecipeTitle';
import { type Recipe } from '../../api/recipes/type/recipe';
import RecipeStep from '@/app/components/recipe/RecipeStep';
import RecipeTag from '@/app/components/recipe/RecipeTag';
import RecipeIngredient from '@/app/components/recipe/RecipeIngredient';
import RecipeHistory from '@/app/components/recipe/RecipeHistory';
import RecipeStepList from '@/app/components/recipe/RecipeStepList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteButton from '@/app/components/button/DeleteButton';
import BackToListButton from '@/app/components/button/BackToListButton';
import EditButton from '@/app/components/button/EditButton';

export default function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `http://localhost:3000/api/recipes/${recipeId}`
      );
      const data: Recipe = await response.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    localStorage.setItem('restoredRecipe', JSON.stringify(recipe));
    router.push(`/recipes/${recipe.id}/edit`);
  };

  const handleRestoreVersion = (versionId: number) => {
    const version = recipe.versions.find((v) => v.id === versionId);
    if (version) {
      setRecipe({
        ...recipe,
        title: version.recipe.title,
        tags: version.recipe.tags,
        ingredients: version.recipe.ingredients,
        steps: version.recipe.steps,
      });
    }
  };

  return (
    <div className='p-5 bg-gray-500 flex-grow h-full'>
      <RecipeTitle title={recipe.title} />
      <h3 className='text-2xl font-semibold mb-4'>조리 과정</h3>
      <RecipeStep steps={recipe.steps} />
      <RecipeTag tags={recipe.tags} />
      <h3 className='text-xl font-semibold mb-2'>재료</h3>
      <RecipeIngredient ingredients={recipe.ingredients} />
      <h3 className='text-xl font-semibold my-2'>조리 과정</h3>
      <RecipeStepList steps={recipe.steps} />
      <h3 className='text-xl font-semibold mt-5 mb-2'>수정 기록</h3>
      <RecipeHistory
        versions={recipe.versions}
        onRestore={handleRestoreVersion}
      />
      <div className='mt-5'>
        <EditButton onClick={handleEditClick} label='수정' />
        <DeleteButton recipeId={recipe.id} />
        <BackToListButton />
      </div>
    </div>
  );
}
