// CookingProcess.tsx
import React from 'react';
import AddButton from '../button/AddButton';
import RecipeStepList from '../recipe/RecipeStepList';

interface StepProps {
  inputStep: string;
  setInputStep: (value: string) => void;
  handleAddStep: () => void;
  steps: string[];
  handleDeleteStep?: (step: number) => void;
}

export default function Step({
  inputStep,
  setInputStep,
  handleAddStep,
  steps,
  handleDeleteStep,
}: StepProps) {
  return (
    <div className='mb-4'>
      <label className='block mb-2'>조리 과정</label>
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='조리 과정을 입력하세요'
          value={inputStep}
          onChange={(e) => setInputStep(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded text-black'
        />
        <AddButton onClick={handleAddStep} label='추가' />
      </div>
      <RecipeStepList steps={steps} onDeleteStep={handleDeleteStep} />
    </div>
  );
}
