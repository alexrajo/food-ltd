import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className='bg-stone-300 h-screen overflow-hidden select-none'>
      <Navbar className='col-span-2 row' />
      <div className='flex h-full'>
        <Outlet />
      </div>
    </div>
  );
}
