import Link from 'next/link';
import { type Recipe } from '../../api/recipes/type/recipe';

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
  return (
    <div className='border border-gray-300 mb-4 p-4 rounded'>
      <h1 className='text-xl font-bold mb-2'>{recipe.title}</h1>
      <div className='mb-2'>
        {recipe.tags.map((tag, index) => (
          <span
            key={index}
            className='inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm mr-2'
          >
            #{tag}
          </span>
        ))}
      </div>
      <Link href={`/recipes/${recipe.id}`}>
        <button className='bg-gray-200 text-gray-700 px-4 py-2 rounded w-full'>
          자세히 보기
        </button>
      </Link>
    </div>
  );
}
