import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAppSelector } from 'src/hooks/useAppRedux'
import FilterMenu from 'src/components/sidebar/FilterMenu'

export default function App() {
  const colorMode = useAppSelector((state) => state.theme.value)
  const openFilterMenu = useAppSelector((state) => state.modals.filterMenu)

  return (
    <div className={`${colorMode == 'dark' ? 'dark' : ''} w-screen `}>
      <div
        className={`relative flex h-screen flex-row text-black dark:text-white`}
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
