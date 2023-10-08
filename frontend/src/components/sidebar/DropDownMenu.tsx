import { useState } from 'react';
import dropdownArrow from 'src/assets/dropdown-arrow.svg';
import useFilter from 'src/hooks/useFilter';
import cn from 'src/utils/cn';

type DropDownMenuProps = {
  heading: string;
  filters: string[];
};

export default function DropDownMenu(props: DropDownMenuProps) {
  const { heading, filters } = props;
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
        <div>{heading}</div>
        <div className={cn(open && 'rotate-180')}>
          <img className="h-10 w-10" src={dropdownArrow} alt="dropdown arrow" />
        </div>
      </button>
      {open && <AddFilter options={filters} />}
    </div>
  );
}

const AddFilter = ({ options }: { options: string[] }) => {
  const { onClickAddFilter, onClickRemoveFilter, filters } = useFilter();

  const handleCheck = (option: string) => {
    if (filters.includes(option)) {
      onClickRemoveFilter(option);
    } else {
      onClickAddFilter(option);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {options.map((option) => (
        <div onClick={() => handleCheck(option)} className="flex w-full gap-2 py-2 cursor-pointer border-b border-b-stone-500 hover:border-b-stone-600">
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
