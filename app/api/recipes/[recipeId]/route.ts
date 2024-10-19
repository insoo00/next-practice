import {
  removeSyncedLocalStorageRecipe,
  syncedLocalStorageRecipes,
  updateSyncedLocalStorageRecipe,
} from '@/lib/file';

export function GET(
  req: Request,
  {
    params: { recipeId },
  }: {
    params: { recipeId: string };
  }
) {
  const recipe = syncedLocalStorageRecipes().find((recipe) => {
    return recipe.id === recipeId;
  });

  return new Response(JSON.stringify(recipe));
}

export async function PUT(
  req: Request,
  {
    params: { recipeId },
  }: {
    params: { recipeId: string };
  }
) {
  const updatedRecipe = await req.json();

  updateSyncedLocalStorageRecipe(recipeId, updatedRecipe);

  return new Response(JSON.stringify(updatedRecipe), { status: 200 });
}
export async function DELETE(
  req: Request,
  {
    params: { recipeId },
  }: {
    params: { recipeId: string };
  }
) {
  removeSyncedLocalStorageRecipe(recipeId);

  return new Response(null, { status: 204 });
}
