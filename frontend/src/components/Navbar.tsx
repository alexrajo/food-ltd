import cn from 'src/utils/cn'
import animation from 'src/assets/animation.json'

import NavElement from 'src/components/navbar/NavElement'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import HomeIcon from 'src/components/icons/HomeIcon'
import SettingsIcon from 'src/components/icons/SettingsIcon'
import { useAppDispatch, useAppSelector } from 'src/hooks/useAppRedux'
import { closeNavbar } from 'src/redux/modalsReducer'
import XIcon from './icons/XIcon'

/**
 * Allows for navigation between pages in the application.
 * Situated at the top of the page.
 */
export default function Navbar({ className }: { className?: string }) {
  const [key, setKey] = useState(0)

  const open = useAppSelector((state) => state.modals.navbar)

  const playLottie = () => {
    setKey((prevKey) => prevKey + 1)
  }

  const dispatch = useAppDispatch()

  // navbar is a sidebar on the left of the screen
  const menuClass = open
    ? 'flex fixed  lg:flex lg:relative'
    : 'hidden fixed lg:flex lg:relative'

  return (
    <div
      className={cn(
        ` h-full ${menuClass} z-50 w-72 flex-col items-center justify-between bg-white drop-shadow-xl dark:bg-secondarydark`,
        className,
      )}
    >
      <div className='flex flex-1 flex-col justify-center gap-6'>
        <div className=' flex flex-col items-center'>
          <p className=' font'>Food Ltd.</p>
          <Link
            to='/'
            onClick={() => {
              playLottie()
            }}
          >
            <Lottie
              loop={false}
              key={key}
              className='h-48 w-48'
              animationData={animation}
            />
          </Link>
        </div>
        <NavElement icon={<HomeIcon />} text='Home' link='/' />
        {/* <NavElement icon={<FavoritesIcon />} text='Favorites' link='/favorites' />
      <NavElement icon={<HistoryIcon />} text='History' link='/history' /> */}
        <NavElement icon={<SettingsIcon />} text='Settings' link='/settings' />
      </div>
      <div className='flex gap-2 pb-20 md:hidden'>
        <XIcon
          onClick={() => {
            dispatch(closeNavbar())
          }}
          width={36}
          height={36}
        />
      </div>
    </div>
  )
}
