interface AddButtonProps {
  onClick: () => void;
  label: string;
}

export default function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <button onClick={onClick} className='bg-purple-300 text-white p-2 rounded'>
      {label}
    </button>
  );
}
