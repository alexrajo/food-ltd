import { useState } from "react";
import cn from "src/utils/cn";

/* This solution is temporary. Waiting for redux states to do properly */
const options = ['New', 'Popular', 'A-Z'];

export default function SortBy() {
    const [selected, setSelected] = useState('New');
  
    return (
      <div className="flex gap-4 my-10">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => setSelected(option)}
            className={cn(
              'cursor-pointer font-thin w-20 text-center',
              selected === option && 'border-b-4 border-blue-700 font-normal'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }