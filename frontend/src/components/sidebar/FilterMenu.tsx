import menu from 'src/assets/burgermenu.svg'
import add from 'src/assets/add-plus-white.svg'
import meat from 'src/assets/meat.svg'
import { useState } from 'react'

/**
 * For holding the different filters on the right side
 */

export default function FilterMenu() {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen(!open)

  return (
    <div className='flex h-full w-96 flex-col gap-6 bg-white px-10 py-20 shadow-xl dark:bg-secondarydark'>
      {/* Menu with profile. I assume we are not doing profile? In that case delete name*/}
      <div className='flex gap-2'>
        <img className='h-10' src={menu} />
        <div>
          <div className='font-bold underline'>Gordon Ramsay</div>
          <div className='text-sm font-thin'>Professional Chef</div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-start text-xl font-bold'>Diet</div>
        <div className='flex gap-4'>
          <FilterBox />
          <FilterBoxAdd />
        </div>
      </div>
      <div className='text-xl font-bold'>Allergies</div>
      <div className='text-xl font-bold'>Cuisines</div>
      <div className='text-xl font-bold'>Goals</div>
    </div>
  )
}

function FilterBox() {
  return (
    <div className='flex h-16 w-16 flex-col items-center justify-center rounded-md bg-tulip'>
      <img className='h-8' src={meat} />
      <div className='text-sm font-bold text-primarydark'>Meat</div>
    </div>
  )
}
function FilterBoxAdd() {
  return (
    <div className='flex h-16 w-16 items-center justify-center rounded-md border-4 border-tulip'>
      <img className='h-8' src={add} />
    </div>
  )
}
