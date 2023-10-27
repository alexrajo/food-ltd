import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import FilterMenu from './components/sidebar/FilterMenu';

export default function App() {
  return (
    <div className='flex flex-row h-screen light:text-black dark:text-white light:bg-lemon dark:bg-primarydark'>
      <Navbar />
      <Outlet />
      <FilterMenu />
    </div>
  );
}
