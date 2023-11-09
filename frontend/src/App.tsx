import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useAppRedux'
import FilterMenu from 'src/components/sidebar/FilterMenu'
import Navbar from './components/Navbar'
import cn from './utils/cn'

export default function App() {
  const colorMode = useAppSelector((state) => state.theme.value)

  return (
    <div className={cn('w-screen', colorMode)}>
      <div className='flex min-h-screen flex-row text-black dark:text-white'>
        <Navbar />
        <div className='flex min-h-full  w-full bg-slate-50 dark:bg-primarydark'>
          <Outlet />
        </div>
        <FilterMenu />
      </div>
    </div>
  )
}
