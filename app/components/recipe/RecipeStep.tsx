'use client';

import { useState } from 'react';
import RecipeTimer from './RecipeTimer';

export default function RecipeStep({ steps }: { steps: string[] }) {
  const [inputTime, setInputTime] = useState<{ [key: number]: number }>({});
  const [activeTimers, setActiveTimers] = useState<{ [key: number]: boolean }>(
    {}
  );

  const startTimer = (index: number) => {
    setActiveTimers((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleInputChange = (index: number, value: string) => {
    setInputTime((prev) => ({
      ...prev,
      [index]: Number(value),
    }));
  };

  const handleTimerEnd = (index: number) => {
    setActiveTimers((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <div>
      {steps.map((step, index) => (
        <div key={index} className='mb-5'>
          <p className='mb-2'>
            Step {index + 1}: {step}
          </p>
          <div className='flex items-center'>
            <input
              type='number'
              className='border border-gray-300 rounded mr-2 p-1 text-black'
              placeholder='초 단위 입력'
              value={inputTime[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              disabled={activeTimers[index]}
            />
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => startTimer(index)}
            >
              타이머 시작
            </button>
          </div>
          {activeTimers[index] && (
            <RecipeTimer
              step={step}
              index={index}
              inputTime={inputTime[index] || 60}
              onTimerEnd={handleTimerEnd}
            />
          )}
        </div>
      ))}
    </div>
  );
}
