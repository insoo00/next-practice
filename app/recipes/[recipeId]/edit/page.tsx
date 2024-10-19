'use client';

import { Recipe, RecipeData } from '@/app/api/recipes/type/recipe';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/date';
import SaveButton from '@/app/components/button/SaveButton';
import Step from '@/app/components/label/Step';
import List from '@/app/components/label/List';
import Tag from '@/app/components/label/Tag';
import Title from '@/app/components/label/Title';

export default function EditRecipe() {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [inputIngredient, setInputIngredient] = useState('');
  const [inputStep, setInputStep] = useState('');

  const router = useRouter();

  useEffect(() => {
    const restoredRecipe = localStorage.getItem('restoredRecipe');
    if (restoredRecipe) {
      const parsedRecipe = JSON.parse(restoredRecipe);
      setRecipe(parsedRecipe);
      setTitle(parsedRecipe.title);
      setTags(parsedRecipe.tags);
      setIngredients(parsedRecipe.ingredients);
      setSteps(parsedRecipe.steps);
      localStorage.removeItem('restoredRecipe');
    } else {
      const fetchRecipe = async () => {
        const response = await fetch(
          `http://localhost:3000/api/recipes/${recipeId}`
        );
        const data: Recipe = await response.json();
        setRecipe(data);
        setTitle(data.title);
        setTags(data.tags);
        setIngredients(data.ingredients);
        setSteps(data.steps);
      };
      fetchRecipe();
    }
  }, []);

  const handleAddTag = () => {
    if (inputTag) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const handleAddIngredient = () => {
    if (inputIngredient) {
      setIngredients([...ingredients, inputIngredient]);
      setInputIngredient('');
    }
  };

  const handleAddStep = () => {
    if (inputStep) {
      setSteps([...steps, inputStep]);
      setInputStep('');
    }
  };

  const handleSaveClick = async () => {
    if (!recipe) return;

    const updatedRecipe: Recipe = {
      ...recipe,
      title,
      tags,
      ingredients,
      steps,
    };

    // 로컬 스토리지 업데이트
    const localStorageRecipes = JSON.parse(
      localStorage.getItem('recipes') || '[]'
    );
    const updatedLocalStorageRecipes = localStorageRecipes.map((r: Recipe) => {
      if (r.id === updatedRecipe.id) {
        const id = Math.max(...r.versions.map(({ id }) => id), 0) + 1;
        const oldRecipeData: RecipeData = {
          id: r.id,
          title: r.title,
          tags: r.tags,
          ingredients: r.ingredients,
          steps: r.steps,
          user: r.user,
        };
        const oldRecipeVersion: {
          id: number;
          date: string;
          recipe: RecipeData;
        } = {
          id,
          date: formatDate(new Date()),
          recipe: oldRecipeData,
        };

        return {
          ...updatedRecipe,
          versions: [...r.versions, oldRecipeVersion],
        };
      }
      return r;
    });
    localStorage.setItem('recipes', JSON.stringify(updatedLocalStorageRecipes));

    // JSON 파일 업데이트
    await fetch(`/api/recipes/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    });

    // 버전 관리
    await fetch(`/api/recipes/${recipeId}/versions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLocalStorageRecipes),
    });

    // 페이지 이동
    router.push(`/recipes/${recipeId}`);
  };

  const handleDeleteTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((t, idx) => idx !== index));
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((i, idx) => idx !== index)
    );
  };

  const handleDeleteStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((s, idx) => idx !== index));
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className='p-5 bg-gray-500 flex-grow h-full'>
      <h1 className='text-2xl font-semibold mb-4'>레시피 수정</h1>
      <Title title={title} setTitle={setTitle} />
      <Tag
        inputTag={inputTag}
        setInputTag={setInputTag}
        handleAddTag={handleAddTag}
        tags={tags}
        handleDeleteTag={handleDeleteTag}
      />
      <List
        inputIngredient={inputIngredient}
        setInputIngredient={setInputIngredient}
        handleAddIngredient={handleAddIngredient}
        ingredients={ingredients}
        handleDeleteIngredient={handleDeleteIngredient}
      />
      <Step
        inputStep={inputStep}
        setInputStep={setInputStep}
        handleAddStep={handleAddStep}
        steps={steps}
        handleDeleteStep={handleDeleteStep}
      />
      <SaveButton onClick={handleSaveClick} label='저장' />
    </div>
  );
}
