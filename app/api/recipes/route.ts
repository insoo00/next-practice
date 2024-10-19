import { NextRequest } from 'next/server';
import { syncedLocalStorageRecipes } from '@/lib/file';

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user');
  const decodedUser = decodeURIComponent(user || '');

  const filteredRecipes = syncedLocalStorageRecipes().filter((recipe) => {
    return recipe.user === decodedUser;
  });

  return new Response(JSON.stringify(filteredRecipes));
}
