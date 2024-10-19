interface TitleProps {
  title: string;
  setTitle: (value: string) => void;
}

export default function Title({ title, setTitle }: TitleProps) {
  return (
    <div className='mb-4'>
      <label className='block mb-2'>레시피 제목</label>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded text-black'
      />
    </div>
  );
}
