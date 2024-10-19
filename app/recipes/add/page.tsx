'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import { Recipe } from '@/app/api/recipes/type/recipe';
import syncData from '@/lib/sync';
import Step from '@/app/components/label/Step';
import List from '@/app/components/label/List';
import Tag from '@/app/components/label/Tag';
import Title from '@/app/components/label/Title';

export default function RecipeAdd() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [inputIngredient, setInputIngredient] = useState('');
  const [inputStep, setInputStep] = useState('');

  const { data: session } = useSession();
  const router = useRouter();

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

  const handleSaveRecipe = async ({
    title,
    tags,
    ingredients,
    steps,
  }: {
    title: string;
    tags: string[];
    ingredients: string[];
    steps: string[];
  }) => {
    const id = uuid();

    const user = session?.user?.email || '';
    const newRecipe: Recipe = {
      id,
      title,
      tags,
      ingredients,
      steps,
      user,
      versions: [],
    };

    const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    storedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
    await syncData();
    router.push('/recipes');
  };

  return (
    <main className='flex-grow bg-gray-500 p-4'>
      <h2 className='text-2xl font-bold mb-4'>레시피 추가</h2>
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

      <button
        onClick={() => handleSaveRecipe({ title, tags, ingredients, steps })}
        className='bg-blue-300 text-white p-2 rounded mt-4'
      >
        레시피 저장
      </button>
    </main>
  );
}
