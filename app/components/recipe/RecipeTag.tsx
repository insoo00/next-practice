import React from 'react';

interface RecipeTagProps {
  tags: string[];
  onDeleteTag?: (tag: number) => void;
}

export default function RecipeTag({ tags, onDeleteTag }: RecipeTagProps) {
  return (
    <div className='my-2'>
      {tags.map((tag, index) => (
        <div
          key={index}
          className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
        >
          {tag}
          {onDeleteTag && (
            <button
              onClick={() => onDeleteTag(index)}
              className='ml-2 text-red-500'
            >
              삭제
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
