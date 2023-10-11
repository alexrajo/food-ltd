import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className='h-screen select-none overflow-hidden bg-stone-300 text-primary-text'>
      <Navbar className='row col-span-2' />
      <div className='flex h-full'>
        <Outlet />
      </div>
    </div>
  )
}
