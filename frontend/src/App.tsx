import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAppSelector } from 'src/hooks/useAppRedux'
import FilterMenu from 'src/components/sidebar/FilterMenu'
import cn from './utils/cn'

export default function App() {
  const colorMode = useAppSelector((state) => state.theme.value)
  const openFilterMenu = useAppSelector((state) => state.modals.filterMenu)

  // `${colorMode == 'dark' ? 'dark' : ''} w-screen `
  return (
    <div className={cn("w-screen", colorMode === 'dark' && 'dark' )}>
      <div
        className='relative flex h-screen flex-row text-black dark:text-white'
      >
        <Navbar />
        <div className='flex h-full w-full bg-slate-50 dark:bg-primarydark'>
          <Outlet />
        </div>
        {openFilterMenu && <FilterMenu />}
      </div>
    </div>
  )
}
