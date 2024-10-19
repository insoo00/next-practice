import React from 'react';

export default function RecipeStepList({
  steps,
  onDeleteStep,
}: {
  steps: string[];
  onDeleteStep?: (step: number) => void;
}) {
  return (
    <div className='my-2'>
      <ol className='list-decimal list-inside'>
        {steps.map((step, index) => (
          <li key={index} className='mb-2 '>
            {step}
            {onDeleteStep && (
              <button
                onClick={() => onDeleteStep(index)}
                className='ml-2 text-red-500 text-sm'
              >
                삭제
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
