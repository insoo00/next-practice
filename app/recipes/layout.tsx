'use client';

// import { useLayoutEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { type Recipe } from '../api/recipes/type/recipe';

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [recipes, setRecipes] = useState<Recipe[]>([]);
  //   useLayoutEffect(() => {
  //     (async function () {
  //       const data = (await fetch('http://localhost:3000/api/recipes').then(
  //         (res) => res.json()
  //       )) as Recipe[];
  //       setRecipes(data);
  //     })();
  //   }, []);

  return <>{children}</>;
}
