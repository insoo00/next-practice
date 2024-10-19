export type Recipe = {
  id: string;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  user: string;
  versions: {
    id: number;
    date: string;
    recipe: RecipeData;
  }[];
};

export type RecipeData = {
  id: string;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  user: string;
};
