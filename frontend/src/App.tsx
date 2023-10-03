import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_5fr] grid-rows-[min-content_auto] bg-stone-300 h-screen overflow-hidden select-none">
      <Navbar className="col-span-2 row" />
      <Sidebar className='hidden lg:flex' />
      <div className="overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
