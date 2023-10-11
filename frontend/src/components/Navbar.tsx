import cn from "src/utils/cn";
import logo from 'src/assets/logo.svg'
import { Link } from "react-router-dom";

export default function Navbar({ className }: { className?: string }) {
    return (
      <div className={cn('flex justify-between bg-stone-400 shadow-xl', className)}>
        <div className="pl-10 flex gap-10 cursor-pointer">
          <Link to="/" className="flex items-center">
            <img alt='logo' className="h-20 w-20" src={logo} />
            <div className="hidden md:block text-3xl font-bold">Food Ltd.</div>
          </Link>
  
        </div>
        <div className='hidden sm:flex items-center'>
          <div className='flex hover:border-b-4 border-b-stone-700 w-40 cursor-pointer h-full items-center justify-center border-l hover:bg-stone-300'>Favourites</div>
          <div className='flex hover:border-b-4 border-b-stone-700 w-40 cursor-pointer h-full items-center justify-center border-x hover:bg-stone-300'>Shopping list</div>
        </div>
      </div>
    );
  };
  
  