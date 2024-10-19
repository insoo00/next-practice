import { Recipe } from '@/app/api/recipes/type/recipe';
import fs from 'fs';
import path from 'path';

// 파일 경로 설정
const filePath = path.resolve(process.cwd(), 'data', 'localStorage.json');

// JSON 파일 읽기
export const syncedLocalStorageRecipes = (): Recipe[] => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addSyncedLocalStorageRecipes = (localStorageRecipes: Recipe[]) => {
  const currentRecipes: Recipe[] = syncedLocalStorageRecipes();
  localStorageRecipes.forEach((recipe) => {
    if (!currentRecipes.find((r) => r.id === recipe.id)) {
      currentRecipes.push(recipe);
    }
  });
  fs.writeFileSync(filePath, JSON.stringify(currentRecipes), 'utf-8');
};

export const updateSyncedLocalStorageRecipe = (
  recipeId: string,
  updatedRecipe: Recipe
) => {
  const currentRecipes: Recipe[] = syncedLocalStorageRecipes();
  const updatedRecipes = currentRecipes.map((r) =>
    r.id === recipeId ? updatedRecipe : r
  );
  fs.writeFileSync(filePath, JSON.stringify(updatedRecipes), 'utf-8');
};

export const removeSyncedLocalStorageRecipe = (recipeId: string) => {
  const currentRecipes: Recipe[] = syncedLocalStorageRecipes();
  const updatedRecipes = currentRecipes.filter((r) => r.id !== recipeId);
  fs.writeFileSync(filePath, JSON.stringify(updatedRecipes), 'utf-8');
};

export const addSyncedLocalStorageRecipeVersion = (
  recipeId: string,
  updatedRecipe: Recipe
) => {
  fs.writeFileSync(filePath, JSON.stringify(updatedRecipe), 'utf-8');
};
