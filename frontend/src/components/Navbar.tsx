import cn from 'src/utils/cn';
import home from 'src/assets/home.svg';
import favorite from 'src/assets/favorite.svg';
import settings from 'src/assets/settings.svg';
import animation from 'src/assets/animation.json';

import NavElement from 'src/components/navbar/NavElement';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import HomeIcon from 'src/components/icons/HomeIcon';
import SettingsIcon from 'src/components/icons/SettingsIcon';
import FavoritesIcon from 'src/components/icons/FavoritesIcon';
import HistoryIcon from 'src/components/icons/HistoryIcon';

/**
 * Allows for navigation between pages in the application.
 * Situated at the top of the page.
 */
export default function Navbar({ className }: { className?: string }) {
  const [key, setKey] = useState(0);

  const playLottie = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 light:bg-white dark:bg-secondarydark w-72 h-full shadow-xl',
        className
      )}
    >
      <div className=' flex items-center flex-col absolute top-0 p-20'>
        <p className=' font'>Food Ltd.</p>
        <Link
          to='/'
          onClick={() => {
            playLottie();
          }}
        >
          <Lottie loop={false} key={key} className='w-48 h-48' animationData={animation} />
        </Link>
      </div>
      <NavElement icon={<HomeIcon />} text='Home' link='/' />
      <NavElement icon={<FavoritesIcon />} text='Favorites' link='/favorites' />
      <NavElement icon={<HistoryIcon />} text='History' link='/history' />
      <NavElement icon={<SettingsIcon />} text='Settings' link='/settings' />
    </div>
  );
}
