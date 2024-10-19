import { NextRequest } from 'next/server';

import { Recipe } from '../recipes/type/recipe';
import { addSyncedLocalStorageRecipes } from '@/lib/file';

export async function POST(req: NextRequest) {
  const localStorageRecipes: Recipe[] = await req.json();

  addSyncedLocalStorageRecipes(localStorageRecipes);

  return Response.json(
    { message: 'Local storage data synced successfully' },
    { status: 200 }
  );
}
