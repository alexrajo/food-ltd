import { useState } from 'react';
import dropdownArrow from 'src/assets/dropdown-arrow.svg';
import useFilter from 'src/hooks/useFilter';
import cn from 'src/utils/cn';
import { EXCLUDE_FILTER_OPTIONS, INCLUDE_FILTER_OPTIONS } from 'src/utils/constants';

type DropDownMenuProps = {
  type: 'include' | 'exclude';
};

export default function DropDownMenu(props: DropDownMenuProps) {
  const { type } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'flex w-52 justify-between items-center font-bold h-20 cursor-pointer hover:text-slate-600',
          open && 'font-extrabold'
        )}
      >
        <div className="first-letter:uppercase">{`${type} ingredients`}</div>
        <div className={cn(open && 'rotate-180')}>
          <img className="h-10 w-10" src={dropdownArrow} alt="dropdown arrow" />
        </div>
      </button>
      {open && <AddFilter type={type} />}
    </div>
  );
}

/* 
  TODO : make more modular filter add.
  We currently only have two ways to add filter (which is checked for individually),
  but we want to add more.
*/
const AddFilter = (props: DropDownMenuProps) => {
  const { type } = props;
  const {
    includeFilter,
    excludeFilter,
    removeIncludedFilter,
    removeExcludedFilter,
    includedFilters,
    excludedFilters,
  } = useFilter();
  const add = type === 'include' ? includeFilter : excludeFilter;
  const remove =
    type === 'include' ? removeIncludedFilter : removeExcludedFilter;
  const filters = type === 'include' ? includedFilters : excludedFilters;
  const options = type === 'include' ? INCLUDE_FILTER_OPTIONS : EXCLUDE_FILTER_OPTIONS

  const handleCheck = (option: string) => {
    if (filters.includes(option)) {
      remove(option);
    } else {
      add(option);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {options.map((option) => (
        <div
          onClick={() => handleCheck(option)}
          className="flex w-full gap-2 py-2 cursor-pointer border-b border-b-stone-500 hover:border-b-stone-600"
        >
          <input
            type="checkbox"
            value={option}
            checked={filters.includes(option)}
            onChange={() => handleCheck(option)}
          />
          <div>{option}</div>
        </div>
      ))}
    </div>
  );
};
