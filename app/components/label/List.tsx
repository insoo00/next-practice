import AddButton from '../button/AddButton';
import RecipeIngredient from '../recipe/RecipeIngredient';

interface ListProps {
  inputIngredient: string;
  setInputIngredient: (value: string) => void;
  handleAddIngredient: () => void;
  ingredients: string[];
  handleDeleteIngredient?: (ingredient: number) => void;
}

export default function List({
  inputIngredient,
  setInputIngredient,
  handleAddIngredient,
  ingredients,
  handleDeleteIngredient,
}: ListProps) {
  return (
    <div className='mb-4'>
      <label className='block mb-2'>재료 목록</label>
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='재료를 입력하세요'
          value={inputIngredient}
          onChange={(e) => setInputIngredient(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded text-black'
        />
        <AddButton onClick={handleAddIngredient} label='추가' />
      </div>
      <RecipeIngredient
        ingredients={ingredients}
        onDeleteIngredient={handleDeleteIngredient}
      />
    </div>
  );
}
