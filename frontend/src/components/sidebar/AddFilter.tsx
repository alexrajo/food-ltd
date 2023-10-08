import useFilter from 'src/hooks/useFilter';
import { INCLUDE_FILTER_OPTIONS, EXCLUDE_FILTER_OPTIONS } from 'src/utils/constants';

/* 
  TODO : make more modular filter add. I will clean up this component, the code is very ugly
  We currently only have two ways to add filter (which is checked for individually),
  but we want to add more.
*/

type AddFilterProps = {
  type: string;
};

export default function AddFilter(props: AddFilterProps) {
  const { type } = props;
  const { includeFilter, excludeFilter, removeIncludedFilter, removeExcludedFilter, includedFilters, excludedFilters } =
    useFilter();
  const add = type === 'include' ? includeFilter : excludeFilter;
  const remove = type === 'include' ? removeIncludedFilter : removeExcludedFilter;
  const filters = type === 'include' ? includedFilters : excludedFilters;
  const options = type === 'include' ? INCLUDE_FILTER_OPTIONS : EXCLUDE_FILTER_OPTIONS;

  const handleCheck = (option: string) => {
    if (filters.includes(option)) {
      remove(option);
    } else {
      add(option);
    }
  };

  return (
    <div className='flex flex-col items-start gap-4'>
      {options.map((option) => (
        <button
          type='button'
          onClick={() => handleCheck(option)}
          className='flex w-full gap-2 py-2 cursor-pointer border-b border-b-stone-500 hover:border-b-stone-600'
        >
          <input type='checkbox' value={option} checked={filters.includes(option)} />
          <div>{option}</div>
        </button>
      ))}
    </div>
  );
}
