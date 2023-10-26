import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className='flex flex-row h-screen light:text-black dark:text-white'>
      <Navbar />
      <div className='flex h-full w-full light:bg-lemon dark:bg-primarydark'>
        <Outlet />
      </div>
    </div>
  );
}
