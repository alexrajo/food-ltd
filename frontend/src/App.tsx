import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAppSelector } from 'src/hooks/useAppRedux'
import Sidebar from 'src/components/Sidebar'

export default function App() {
  const colorMode = useAppSelector((state) => state.theme.value)

  return (
    <div className={`${colorMode == 'dark' ? 'dark' : ''}`}>
      <div className={`flex h-screen flex-row text-black dark:text-white`}>
        <Navbar />
        <div className='flex h-full w-full bg-white dark:bg-primarydark'>
          <Outlet />
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
