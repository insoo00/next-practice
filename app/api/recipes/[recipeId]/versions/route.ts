import { addSyncedLocalStorageRecipeVersion } from '@/lib/file';
import { Recipe } from '../../type/recipe';

export async function POST(
  req: Request,
  {
    params: { recipeId },
  }: {
    params: { recipeId: string };
  }
) {
  const localStorageRecipe: Recipe = await req.json();

  addSyncedLocalStorageRecipeVersion(recipeId, localStorageRecipe);

  return Response.json(
    { message: 'Local storage version data synced successfully' },
    { status: 200 }
  );
}
