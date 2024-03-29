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
 * In reality a sidebar, because it has been moved to the left side of the page.
 * TODO : rename to sidebar.
 */
export default function Navbar({ className }: { className?: string }) {
  const [key, setKey] = useState(0)

  const open = useAppSelector((state) => state.modals.navbar)

  const playLottie = () => {
    setKey((prevKey) => prevKey + 1)
  }

  const dispatch = useAppDispatch()

  // navbar is a sidebar on the left of the screen
  const menuClass = open ? 'flex' : 'hidden lg:flex'

  return (
    <div
      className={cn(
        'fixed top-0 z-50 h-screen w-full flex-col items-center justify-between bg-white drop-shadow-xl dark:bg-secondarydark sm:sticky sm:w-72',
        menuClass,
        className,
      )}
    >
      <div className='flex flex-1 flex-col justify-center gap-6'>
        <div className=' flex flex-col items-center'>
          <Link
            to='/'
            aria-label='Link to homepage of Food Ltd.'
            onClick={() => {
              playLottie()
            }}
          >
            <h1 className='text-center'>Food Ltd.</h1>
            <Lottie
              loop={false}
              key={key}
              className='h-48 w-48'
              animationData={animation}
            />
          </Link>
        </div>
        <NavElement icon={<HomeIcon />} text='Home' link='/' />
        <NavElement icon={<SettingsIcon />} text='Settings' link='/settings' />
      </div>
      <div className='flex gap-2 pb-20 md:hidden'>
        <XIcon
          data-testid='close navigation menu'
          ariaLabel='Close navigation bar'
          onClick={() => {
            dispatch(closeNavbar())
          }}
          className='cursor-pointer'
          width={36}
          height={36}
        />
      </div>
    </div>
  )
}
