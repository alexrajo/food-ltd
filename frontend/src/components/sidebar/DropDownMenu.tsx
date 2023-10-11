import { useState } from 'react'
import dropdownArrow from 'src/assets/dropdown-arrow.svg'
import cn from 'src/utils/cn'
import AddFilter from './AddFilter'

type DropDownMenuProps = {
  type: 'include' | 'exclude'
}

export default function DropDownMenu(props: DropDownMenuProps) {
  const { type } = props
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)

  return (
    <div>
      <button
        type='button'
        onClick={handleClick}
        className={cn(
          'flex h-20 w-52 cursor-pointer items-center justify-between font-bold hover:text-slate-600',
          open && 'font-extrabold',
        )}
      >
        <div className='first-letter:uppercase'>{`${type} ingredients`}</div>
        <div className={cn(open && 'rotate-180')}>
          <img className='h-10 w-10' src={dropdownArrow} alt='dropdown arrow' />
        </div>
      </button>
      {open && <AddFilter type={type} />}
    </div>
  )
}
