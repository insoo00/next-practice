interface EditButtonProps {
  onClick: () => void;
  label: string;
}

export default function EditButton({ onClick, label }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className='bg-yellow-400 text-black px-4 py-2 rounded mr-2'
    >
      {label}
    </button>
  );
}
