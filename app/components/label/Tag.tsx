import AddButton from '../button/AddButton';
import RecipeTag from '../recipe/RecipeTag';

interface TagProps {
  inputTag: string;
  setInputTag: (value: string) => void;
  handleAddTag: () => void;
  tags: string[];
  handleDeleteTag?: (tag: number) => void;
}

export default function Tag({
  inputTag,
  setInputTag,
  handleAddTag,
  tags,
  handleDeleteTag,
}: TagProps) {
  return (
    <div className='mb-4'>
      <label className='block mb-2'>태그</label>
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='태그를 입력하세요'
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded text-black'
        />
        <AddButton onClick={handleAddTag} label='추가' />
      </div>
      <RecipeTag tags={tags} onDeleteTag={handleDeleteTag} />
    </div>
  );
}
