import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className='light:text-black flex h-screen flex-row dark:text-white'>
      <Navbar />
      <div className='light:bg-primary flex h-full w-full dark:bg-primarydark'>
        <Outlet />
      </div>
    </div>
  )
}
