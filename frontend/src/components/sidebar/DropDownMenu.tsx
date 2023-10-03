import { useState } from 'react';
import dropdownArrow from 'src/assets/dropdown-arrow.svg'
import cn from 'src/utils/cn';

export default function DropDownMenu ({ heading }: { heading: string }) {
    const [open, setOpen] = useState(false);
  
    const handleClick = () => setOpen(!open)
    
    return (
      <div>
        <button
          type='button'
          onClick={handleClick}
          className={cn(
            'flex w-48 justify-between items-center font-bold h-20 cursor-pointer hover:text-slate-600',
            open && 'font-extrabold'
            )}
        >
          <div>{heading}</div>
          <div className={cn(open && 'rotate-180')}>
            <img className='h-10 w-10' src={dropdownArrow} alt='dropdown arrow' />
          </div>
        </button>
        {open && <div>(valg her)</div>}
      </div>
    );
  };