interface RecipeVersion {
  id: number;
  date: string;
}

interface RecipeHistoryProps {
  versions: RecipeVersion[];
  onRestore: (versionId: number) => void;
}

export default function RecipeHistory({
  versions,
  onRestore,
}: RecipeHistoryProps) {
  return (
    <div>
      {versions.map((version) => (
        <div key={version.id} className='mb-2'>
          <div className='flex items-center'>
            <span>{`버전 ${version.id}: ${version.date}`}</span>
            <button
              onClick={() => onRestore(version.id)}
              className='bg-blue-500 text-white ml-2 px-2 py-1 rounded'
            >
              복원
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
