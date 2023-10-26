import Sidebar from 'src/components/Sidebar'
import FoodGallery from 'src/components/home/FoodGallery'
import Search from 'src/components/home/Search'
import SelectedFilters from 'src/components/home/SelectedFilters'
import SortBy from 'src/components/home/SortBy'

/**
 * Holds all the components that show up on the main page.
 */
export default function Home() {
  return (
    <div className='flex'>
      <Sidebar className='hidden lg:flex' />
      <div className='no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll p-20'>
        <Search />
        <SelectedFilters />
        <SortBy />
        <FoodGallery />
        <div className='my-20' />
      </div>
    </div>
  )
}
