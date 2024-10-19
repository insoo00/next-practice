import React from 'react';

export default function RecipeIngredient({
  ingredients,
  onDeleteIngredient,
}: {
  ingredients: string[];
  onDeleteIngredient?: (ingredient: number) => void;
}) {
  return (
    <div className='my-2'>
      <ul className='list-disc list-inside'>
        {ingredients.map((ingredient, index) => (
          <li key={index} className=''>
            {ingredient}
            {onDeleteIngredient && (
              <button
                onClick={() => onDeleteIngredient(index)}
                className='ml-2 text-red-500 text-sm'
              >
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
