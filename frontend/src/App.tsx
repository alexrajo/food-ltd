import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAppSelector } from 'src/hooks/useAppRedux'
import FilterMenu from 'src/components/sidebar/FilterMenu'

export default function App() {
  const colorMode = useAppSelector((state) => state.theme.value)

  return (
    <div className={`${colorMode == 'dark' ? 'dark' : ''} w-screen `}>
      <div
        className={`relative flex h-screen flex-row text-black dark:text-white`}
      >
        <Navbar />
        <div className='flex h-full w-full bg-white dark:bg-primarydark'>
          <Outlet />
        </div>
        <FilterMenu />
      </div>
    </div>
  )
}
