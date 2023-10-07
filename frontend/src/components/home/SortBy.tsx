import useSort from 'src/hooks/useSort';
import cn from 'src/utils/cn';
import { SORTING_OPTIONS } from 'src/utils/constants';

export default function SortBy() {
  const [sortingPreference, setSortingPreference] = useSort();

  const renderButton = (option: string) => {
    const onClick = () => {
      setSortingPreference(option);
    };
    return (
      <button
        type='button'
        key={option}
        onClick={onClick}
        className={cn(
          'cursor-pointer font-thin w-20 text-center',
          sortingPreference === option && 'border-b-4 border-blue-700 font-normal'
        )}
      >
        {option}
      </button>
    );
  };

  return <div className='flex gap-4 my-10'>{SORTING_OPTIONS.map(renderButton)}</div>;
}
