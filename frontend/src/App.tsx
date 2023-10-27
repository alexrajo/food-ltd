import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAppSelector } from 'src/hooks/useAppRedux'

export default function App() {
  const colorMode = useAppSelector((state) => state.theme.value)

  return (
    <div className={`${colorMode == 'dark' ? 'dark' : ''}`}>
      <div
        className={`light:text-black flex h-screen flex-row dark:text-white`}
      >
        <Navbar />
        <div className='light:bg-primary flex h-full w-full dark:bg-primarydark'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
