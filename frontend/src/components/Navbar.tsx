import cn from 'src/utils/cn'
import logo from 'src/assets/logo.svg'
import { Link } from 'react-router-dom'

export default function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex justify-between bg-stone-400 shadow-xl', className)}
    >
      <div className='flex cursor-pointer gap-10 pl-10'>
        <Link to='/' className='flex items-center'>
          <img alt='logo' className='h-20 w-20' src={logo} />
          <div className='hidden text-3xl font-bold md:block'>Food Ltd.</div>
        </Link>
      </div>
      <div className='hidden items-center sm:flex'>
        <div className='flex h-full w-40 cursor-pointer items-center justify-center border-l border-b-stone-700 hover:border-b-4 hover:bg-stone-300'>
          Favourites
        </div>
        <div className='flex h-full w-40 cursor-pointer items-center justify-center border-x border-b-stone-700 hover:border-b-4 hover:bg-stone-300'>
          Shopping list
        </div>
      </div>
    </div>
  )
}
