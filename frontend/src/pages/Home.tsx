import Sidebar from 'src/components/Sidebar';
import FoodGallery from 'src/components/home/FoodGallery';
import Search from 'src/components/home/Search';
import SelectedFilters from 'src/components/home/SelectedFilters';
import SortBy from 'src/components/home/SortBy';

export default function Home() {
  return (
    <div className='flex'>
      <Sidebar className='hidden lg:flex' />
      <div className='flex flex-col gap-2 p-20 w-full overflow-y-scroll'>
        <Search />
        <SelectedFilters />
        <SortBy />
        <FoodGallery />
        <div className='my-20' />
      </div>
    </div>
  );
}
