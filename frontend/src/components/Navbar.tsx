import cn from 'src/utils/cn'
import logo from 'src/assets/logo.svg'

/* TODO: breadcrumbs, and blue bottom border on the current selected page */
export default function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex justify-between bg-stone-400 shadow-xl', className)}
    >
      <div className='pl-10 flex gap-10 cursor-pointer'>
        <div className='flex items-center'>
          <img alt='logo' className='h-20 w-20' src={logo} />
          <div className='hidden md:block text-3xl font-bold'>Food Ltd.</div>
        </div>
        <div className='flex gap-8 text-xl items-center'>
          <div className='h-full flex justify-center items-center cursor-pointer border-b-4 border-b-blue-700'>
            Recipes
          </div>
          <div className='h-full flex justify-center items-center cursor-pointer hover:border-b-4 border-b-stone-700'>
            Page 2
          </div>
          <div className='h-full flex justify-center items-center cursor-pointer hover:border-b-4 border-b-stone-700'>
            Page 3
          </div>
          <div className='h-full flex justify-center items-center cursor-pointer hover:border-b-4 border-b-stone-700'>
            Page 4
          </div>
        </div>
      </div>
      <div className='hidden md:flex items-center'>
        <div className='hidden lg:flex hover:border-b-4 border-b-stone-700 w-40 cursor-pointer h-full items-center justify-center border-l hover:bg-stone-300'>
          Favourites
        </div>
        <div className='hidden lg:flex hover:border-b-4 border-b-stone-700 w-40 cursor-pointer h-full items-center justify-center border-l hover:bg-stone-300'>
          Plan
        </div>
        <div className='hidden xl:flex cursor-pointer h-full items-center justify-center w-40 border-l hover:bg-blue-500 bg-blue-700 text-white'>
          Search
        </div>
      </div>
    </div>
  )
}
