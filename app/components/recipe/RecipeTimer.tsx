import { useState, useEffect } from 'react';

interface TimerProps {
  step: string;
  index: number;
  inputTime: number;
  onTimerEnd: (index: number) => void;
}

export default function RecipeTimer({
  index,
  inputTime,
  onTimerEnd,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(inputTime);

  useEffect(() => {
    setTimeLeft(inputTime);

    if (inputTime > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [inputTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerEnd(index);
      alert(`Step ${index + 1} 타이머가 종료되었습니다!`);
    }
  }, [timeLeft, index, onTimerEnd]);

  return (
    <div className='mt-2'>
      <p>남은 시간: {timeLeft}초</p>
    </div>
  );
}
